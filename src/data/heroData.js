import srDesigner from "../components/Pages/images/sr-designer.png";

export const builtInHeroImages = {
    srDesigner,
};

export const builtInHeroImageOptions = [
    { key: "srDesigner", label: "Default Hero Illustration" },
];

export const defaultHero = {
    "paragraph": "I help businesses build fast, user-friendly, and SEO-optimized websites using WordPress and Shopify. With 8+ years of hands-on experience, I turn ideas into high-performing digital platforms that drive results. hello Amit",
    "imgKey": "srDesigner",
    "imgUrl": ""
};

export function resolveHeroImage(hero) {
    if (hero.imgUrl) return hero.imgUrl;
    return builtInHeroImages[hero.imgKey] || builtInHeroImages.srDesigner;
}
