import { defaultAbout } from "../data/aboutData";

const STORAGE_KEY = "portfolio_about_draft_v1";

export function loadAbout() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultAbout;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.heading) return defaultAbout;
        return parsed;
    } catch (e) {
        return defaultAbout;
    }
}

export function saveAbout(about) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(about));
}

export function resetAbout() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasAboutDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
