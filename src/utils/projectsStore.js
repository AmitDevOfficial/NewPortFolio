import { defaultProjects } from "../data/projectsData";

export function loadProjects() {
    return defaultProjects;
}

export function saveProjects() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetProjects() {
    // Nothing local to clear; the form is reset to the currently published defaultProjects.
}
