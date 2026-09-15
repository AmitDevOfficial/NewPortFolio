import { defaultTools } from "../data/toolsData";

const STORAGE_KEY = "portfolio_tools_draft_v1";

export function loadTools() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultTools;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return defaultTools;
        return parsed;
    } catch (e) {
        return defaultTools;
    }
}

export function saveTools(tools) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
}

export function resetTools() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasToolsDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
