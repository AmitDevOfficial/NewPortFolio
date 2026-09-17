import { defaultContact } from "../data/contactData";

export function loadContact() {
    return defaultContact;
}

export function saveContact() {
    // Persistence happens via publishSection() committing to GitHub — nothing to do locally.
}

export function resetContact() {
    // Nothing local to clear; the form is reset to the currently published defaultContact.
}
