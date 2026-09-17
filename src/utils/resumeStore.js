import { defaultResume } from "../data/resumeData";

export function loadResume() {
    return defaultResume;
}

export function saveResume() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetResume() {
    // Nothing local to clear; the form is reset to the currently published defaultResume.
}
