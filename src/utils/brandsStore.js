import { defaultBrands } from "../data/brandsData";

export function loadBrands() {
    return defaultBrands;
}

export function saveBrands() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetBrands() {
    // Nothing local to clear; the form is reset to the currently published defaultBrands.
}
