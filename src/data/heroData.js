import srDesigner from "../components/Pages/images/sr-designer.png";

export const builtInHeroImages = {
    srDesigner,
};

export const builtInHeroImageOptions = [
    { key: "srDesigner", label: "Default Hero Illustration" },
];

export const defaultHero = {
    "paragraph": "I build lightning-fast, SEO-ready WordPress and Shopify websites and scalable MERN stack apps. With 3year and 8 months of proven expertise, I turn ideas into powerful digital products driving measurable growth.",
    "imgKey": "srDesigner",
    "imgUrl": "/uploads/hero-1789828190523-1.png"
};

export function resolveHeroImage(hero) {
    if (hero.imgUrl) return hero.imgUrl;
    return builtInHeroImages[hero.imgKey] || builtInHeroImages.srDesigner;
}
