import { defaultTools } from "../data/toolsData";

export function loadTools() {
    return defaultTools;
}

export function saveTools() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetTools() {
    // Nothing local to clear; the form is reset to the currently published defaultTools.
}
