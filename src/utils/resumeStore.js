import { defaultResume } from "../data/resumeData";

const STORAGE_KEY = "portfolio_resume_draft_v1";

export function loadResume() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultResume;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.url) return defaultResume;
        return parsed;
    } catch (e) {
        return defaultResume;
    }
}

export function saveResume(resume) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
}

export function resetResume() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasResumeDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
