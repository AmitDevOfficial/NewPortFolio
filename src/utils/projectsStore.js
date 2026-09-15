import { defaultProjects } from "../data/projectsData";

const STORAGE_KEY = "portfolio_projects_draft_v1";

export function loadProjects() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultProjects;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return defaultProjects;
        return parsed;
    } catch (e) {
        return defaultProjects;
    }
}

export function saveProjects(projects) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function resetProjects() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
