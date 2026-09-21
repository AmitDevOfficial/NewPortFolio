import aboutImg from "../components/Pages/images/HomeImg/aboutImg.jpeg";

export const builtInAboutImages = {
    aboutImg,
};

export const builtInAboutImageOptions = [
    { key: "aboutImg", label: "Default About Photo" },
];

export const defaultAbout = {
    "tag": "About Me",
    "heading": "Inquisitive and passionate about emerging technology.",
    "paragraphs": [
        "I'm Amit Vishwakarma, a passionate web developer with 3 years  & 8 Months of experience crafting WordPress and Shopify websites. A 6-month MERN stack internship sharpened my full-stack skills, making me versatile and results-driven.",
        "Beyond CMS platforms, I've built a strong command of React JS, and I'm actively evolving toward crafting modern, scalable, high-performance front-end experiences using the latest web technologies.",
        "Looking to hire a developer who understands both traditional CMS and modern JavaScript frameworks? Let's connect and build something exceptional together. Download my resume using the button below to learn more."
    ],
    "imgKey": "aboutImg",
    "imgUrl": ""
};

export function resolveAboutImage(about) {
    if (about.imgUrl) return about.imgUrl;
    return builtInAboutImages[about.imgKey] || builtInAboutImages.aboutImg;
}
