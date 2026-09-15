import brand01 from "../components/Pages/images/sliderImg/brand-big-01.png";
import brand02 from "../components/Pages/images/sliderImg/brand-big-02.png";
import brand03 from "../components/Pages/images/sliderImg/brand-big-03.png";
import brand04 from "../components/Pages/images/sliderImg/brand-big-04.png";
import brand05 from "../components/Pages/images/sliderImg/brand-big-05.png";
import brand06 from "../components/Pages/images/sliderImg/brand-big-06.png";

export const builtInBrandImages = {
    brand01,
    brand02,
    brand03,
    brand04,
    brand05,
    brand06,
};

export const builtInBrandImageOptions = [
    { key: "brand01", label: "Brand Logo 1" },
    { key: "brand02", label: "Brand Logo 2" },
    { key: "brand03", label: "Brand Logo 3" },
    { key: "brand04", label: "Brand Logo 4" },
    { key: "brand05", label: "Brand Logo 5" },
    { key: "brand06", label: "Brand Logo 6" },
];

export const defaultBrands = [
    { id: "brand-1", imgKey: "brand01", imgUrl: "", alt: "Brand 1" },
    { id: "brand-2", imgKey: "brand02", imgUrl: "", alt: "Brand 2" },
    { id: "brand-3", imgKey: "brand03", imgUrl: "", alt: "Brand 3" },
    { id: "brand-4", imgKey: "brand04", imgUrl: "", alt: "Brand 4" },
    { id: "brand-5", imgKey: "brand05", imgUrl: "", alt: "Brand 5" },
    { id: "brand-6", imgKey: "brand06", imgUrl: "", alt: "Brand 6" },
];

export function resolveBrandImage(brand) {
    if (brand.imgUrl) return brand.imgUrl;
    return builtInBrandImages[brand.imgKey] || builtInBrandImages.brand01;
}
