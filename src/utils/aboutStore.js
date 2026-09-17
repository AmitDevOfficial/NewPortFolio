import { defaultAbout } from "../data/aboutData";

export function loadAbout() {
    return defaultAbout;
}

export function saveAbout() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetAbout() {
    // Nothing local to clear; the form is reset to the currently published defaultAbout.
}
