const GITHUB_API = "https://api.github.com";

const SECTIONS = {
    hero: { path: "src/data/heroData.js", exportName: "defaultHero" },
    about: { path: "src/data/aboutData.js", exportName: "defaultAbout" },
    featuredWork: { path: "src/data/projectsData.js", exportName: "defaultProjects" },
    brands: { path: "src/data/brandsData.js", exportName: "defaultBrands" },
    tools: { path: "src/data/toolsData.js", exportName: "defaultTools" },
    resume: { path: "src/data/resumeData.js", exportName: "defaultResume" },
    contact: { path: "src/data/contactData.js", exportName: "defaultContact" },
};

async function githubRequest(path, options = {}) {
    const res = await fetch(`${GITHUB_API}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            ...(options.headers || {}),
        },
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`GitHub API ${path} failed: ${res.status} ${text}`);
    }
    return res.json();
}

// Replaces the value of `export const <exportName> = <literal>;` inside sourceText,
// using brace/bracket depth matching (with string-literal awareness) so it works
// whether the export is an object or an array, regardless of nesting.
function replaceExport(sourceText, exportName, newValueLiteral) {
    const marker = `export const ${exportName} = `;
    const start = sourceText.indexOf(marker);
    if (start === -1) {
        throw new Error(`Could not find "export const ${exportName}" in file`);
    }
    const valueStart = start + marker.length;
    const openChar = sourceText[valueStart];
    if (openChar !== "{" && openChar !== "[") {
        throw new Error(`Unexpected syntax after export ${exportName}`);
    }
    const closeChar = openChar === "{" ? "}" : "]";

    let depth = 0;
    let inString = null;
    let i = valueStart;
    for (; i < sourceText.length; i++) {
        const ch = sourceText[i];
        if (inString) {
            if (ch === "\\") { i++; continue; }
            if (ch === inString) inString = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") { inString = ch; continue; }
        if (ch === openChar) depth++;
        else if (ch === closeChar) {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    let end = i;
    if (sourceText[end] === ";") end++;

    return sourceText.slice(0, valueStart) + newValueLiteral + ";" + sourceText.slice(end);
}

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    let payload;
    try {
        payload = JSON.parse(event.body || "{}");
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
    }

    const { section, data, key } = payload;

    if (!process.env.ADMIN_SAVE_KEY || key !== process.env.ADMIN_SAVE_KEY) {
        return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const config = SECTIONS[section];
    if (!config || data === undefined) {
        return { statusCode: 400, body: JSON.stringify({ error: "Unknown section or missing data" }) };
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "master";

    if (!process.env.GITHUB_TOKEN || !owner || !repo) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server is not configured (missing GitHub env vars)" }) };
    }

    try {
        const file = await githubRequest(
            `/repos/${owner}/${repo}/contents/${config.path}?ref=${branch}`
        );
        const currentContent = Buffer.from(file.content, "base64").toString("utf8");
        const newLiteral = JSON.stringify(data, null, 4);
        const updatedContent = replaceExport(currentContent, config.exportName, newLiteral);

        if (updatedContent === currentContent) {
            return { statusCode: 200, body: JSON.stringify({ ok: true, unchanged: true }) };
        }

        await githubRequest(`/repos/${owner}/${repo}/contents/${config.path}`, {
            method: "PUT",
            body: JSON.stringify({
                message: `Update ${section} content via admin dashboard`,
                content: Buffer.from(updatedContent, "utf8").toString("base64"),
                sha: file.sha,
                branch,
            }),
        });

        return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
    }
};
