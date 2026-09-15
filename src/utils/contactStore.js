import { defaultContact } from "../data/contactData";

const STORAGE_KEY = "portfolio_contact_draft_v1";

export function loadContact() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultContact;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.email) return defaultContact;
        return parsed;
    } catch (e) {
        return defaultContact;
    }
}

export function saveContact(contact) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
}

export function resetContact() {
    window.localStorage.removeItem(STORAGE_KEY);
}

export function hasContactDraft() {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
}
