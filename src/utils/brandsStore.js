import { defaultBrands } from "../data/brandsData";

const STORAGE_KEY = "portfolio_brands_draft_v1";

export function loadBrands() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultBrands;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return defaultBrands;
        return parsed;
    } catch (e) {
        return defaultBrands;
    }
}

export function saveBrands(brands) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
}

export function resetBrands() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasBrandsDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
