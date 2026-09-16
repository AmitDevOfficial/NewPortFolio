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

const EXT_FOR_MIME = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
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
    if (res.status === 204) return null;
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

// Walks the data payload and pulls out any embedded "data:<mime>;base64,..." strings
// (file uploads from the admin form) so they can be committed as separate binary
// files instead of being inlined as text inside the JS data file. Inlining them
// bloated src/data/projectsData.js past 1MB, which is the hard limit GitHub's
// Contents API can read/write in a single request — past that point, publishing
// silently failed. Returns the data with those fields replaced by short "/uploads/..."
// paths, plus the list of assets to upload.
function extractAssets(value, section, assets, counter) {
    if (typeof value === "string" && value.startsWith("data:")) {
        const match = /^data:([^;]+);base64,(.*)$/.exec(value);
        if (!match) return value;
        const [, mime, base64] = match;
        const ext = EXT_FOR_MIME[mime] || "bin";
        counter.n += 1;
        const filename = `${section}-${Date.now()}-${counter.n}.${ext}`;
        const repoPath = `public/uploads/${filename}`;
        assets.push({ path: repoPath, base64 });
        return `/uploads/${filename}`;
    }
    if (Array.isArray(value)) {
        return value.map((v) => extractAssets(v, section, assets, counter));
    }
    if (value && typeof value === "object") {
        const out = {};
        for (const key of Object.keys(value)) {
            out[key] = extractAssets(value[key], section, assets, counter);
        }
        return out;
    }
    return value;
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
        const assets = [];
        const cleanedData = extractAssets(data, section, assets, { n: 0 });

        const ref = await githubRequest(`/repos/${owner}/${repo}/git/ref/heads/${branch}`);
        const headCommitSha = ref.object.sha;
        const headCommit = await githubRequest(`/repos/${owner}/${repo}/git/commits/${headCommitSha}`);
        const baseTreeSha = headCommit.tree.sha;

        const file = await githubRequest(
            `/repos/${owner}/${repo}/contents/${config.path}?ref=${branch}`
        );
        if (file.content === undefined) {
            throw new Error(`${config.path} is too large for GitHub's Contents API to read (over 1MB) — remove old embedded uploads from it manually, then try again.`);
        }
        const currentContent = Buffer.from(file.content, "base64").toString("utf8");
        const newLiteral = JSON.stringify(cleanedData, null, 4);
        const updatedContent = replaceExport(currentContent, config.exportName, newLiteral);

        if (updatedContent === currentContent && assets.length === 0) {
            return { statusCode: 200, body: JSON.stringify({ ok: true, unchanged: true }) };
        }

        const treeEntries = [{ path: config.path, mode: "100644", type: "blob", content: updatedContent }];
        for (const asset of assets) {
            const blob = await githubRequest(`/repos/${owner}/${repo}/git/blobs`, {
                method: "POST",
                body: JSON.stringify({ content: asset.base64, encoding: "base64" }),
            });
            treeEntries.push({ path: asset.path, mode: "100644", type: "blob", sha: blob.sha });
        }

        const newTree = await githubRequest(`/repos/${owner}/${repo}/git/trees`, {
            method: "POST",
            body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
        });

        const newCommit = await githubRequest(`/repos/${owner}/${repo}/git/commits`, {
            method: "POST",
            body: JSON.stringify({
                message: `Update ${section} content via admin dashboard`,
                tree: newTree.sha,
                parents: [headCommitSha],
            }),
        });

        await githubRequest(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
            method: "PATCH",
            body: JSON.stringify({ sha: newCommit.sha }),
        });

        return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
    }
};
