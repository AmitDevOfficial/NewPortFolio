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
        "I'm Amit Vishwakarma, a passionate web developer with 3years and 8 months of experience in WordPress and Shopify, and I've also completed a 6-month MERN stack internship to strengthen my full-stack development skills.",
        "Along with CMS platforms, I've developed a strong grip on React JS and I'm actively shifting towards modern, scalable, and high-performance front-end development using the latest technologies.",
        "If you're looking to hire a developer who understands both traditional CMS and modern JavaScript frameworks, feel free to contact me. You can also download my resume using the button below."
    ],
    "imgKey": "aboutImg",
    "imgUrl": ""
};

export function resolveAboutImage(about) {
    if (about.imgUrl) return about.imgUrl;
    return builtInAboutImages[about.imgKey] || builtInAboutImages.aboutImg;
}
