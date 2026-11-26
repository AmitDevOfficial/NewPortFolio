export const defaultResume = {
    "url": "/uploads/resume-1795707424948-1.pdf",
    "fileName": "Amit Resume.pdf"
};

export function getResumeSource(resume) {
    if (resume.url.startsWith("data:")) return "upload";
    if (resume.url.startsWith("/Resume/")) return "default";
    return "url";
}
