import { defaultHero } from "../data/heroData";

const STORAGE_KEY = "portfolio_hero_draft_v1";

export function loadHero() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultHero;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.paragraph) return defaultHero;
        return parsed;
    } catch (e) {
        return defaultHero;
    }
}

export function saveHero(hero) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(hero));
}

export function resetHero() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasHeroDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
