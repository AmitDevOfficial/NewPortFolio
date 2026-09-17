import { defaultHero } from "../data/heroData";

export function loadHero() {
    return defaultHero;
}

export function saveHero() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetHero() {
    // Nothing local to clear; the form is reset to the currently published defaultHero.
}
