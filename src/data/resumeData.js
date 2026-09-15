export const defaultResume = {
    url: "/Resume/MERN and CMS Resume.pdf",
    fileName: "Amit-Vishwakarma-Resume.pdf"
};

export function getResumeSource(resume) {
    if (resume.url.startsWith("data:")) return "upload";
    if (resume.url.startsWith("/Resume/")) return "default";
    return "url";
}
