export async function publishSection(section, data) {
    const key = window.sessionStorage.getItem("admin_key") || "";
    const res = await fetch("/.netlify/functions/publish-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data, key }),
    });
    let body = {};
    try {
        body = await res.json();
    } catch (e) {
        // ignore, handled below via res.ok check
    }
    if (!res.ok) {
        throw new Error(body.error || `Publish failed (${res.status})`);
    }
    return body;
}
