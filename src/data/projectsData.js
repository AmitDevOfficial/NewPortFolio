import portfolioOne from "../components/Pages/images/HomeImg/portfolio-large-05.jpg";
import portfolioTwo from "../components/Pages/images/HomeImg/portfolio-large-04.jpg";
import portfolioThree from "../components/Pages/images/HomeImg/portfolio-large-01.jpg";

export const builtInImages = {
    portfolioOne,
    portfolioTwo,
    portfolioThree,
};

export const builtInImageOptions = [
    { key: "portfolioOne", label: "Portfolio Image 1" },
    { key: "portfolioTwo", label: "Portfolio Image 2" },
    { key: "portfolioThree", label: "Portfolio Image 3" },
];

export const defaultProjects = [
    {
        id: "wp-business",
        tag: "WordPress Development",
        title: "Business & Portfolio Websites",
        desc: "Custom WordPress builds focused on clean design, fast load times, and SEO-friendly structure for small businesses and personal brands.",
        tags: ["WordPress", "PHP", "SEO"],
        imgKey: "portfolioOne",
        imgUrl: "",
        link: "",
        featured: true
    },
    {
        id: "shopify-storefront",
        tag: "Shopify Development",
        title: "E-Commerce Storefronts",
        desc: "Shopify stores built with conversion-focused layouts, custom theme tweaks, and a smooth checkout experience across every device.",
        tags: ["Shopify", "Liquid", "UI/UX"],
        imgKey: "portfolioTwo",
        imgUrl: "",
        link: "",
        featured: true
    },
    {
        id: "mern-fullstack",
        tag: "MERN Stack",
        title: "Full-Stack Web Applications",
        desc: "Modern, scalable web apps built with React, Node.js, Express, and MongoDB — from database design to a polished front end.",
        tags: ["React", "Node JS", "MongoDB"],
        imgKey: "portfolioThree",
        imgUrl: "",
        link: "",
        featured: true
    },
    {
        id: "wp-landing",
        tag: "WordPress Development",
        title: "Landing Pages & Blogs",
        desc: "Fast, content-friendly WordPress landing pages and blogs built for easy editing and strong search visibility.",
        tags: ["WordPress", "Elementor", "SEO"],
        imgKey: "portfolioTwo",
        imgUrl: "",
        link: "",
        featured: false
    },
    {
        id: "shopify-theme",
        tag: "Shopify Development",
        title: "Custom Theme Development",
        desc: "Hand-tuned Shopify theme customizations to match brand identity and improve on-site conversion rates.",
        tags: ["Shopify", "Liquid", "CRO"],
        imgKey: "portfolioThree",
        imgUrl: "",
        link: "",
        featured: false
    },
    {
        id: "mern-dashboards",
        tag: "MERN Stack",
        title: "Admin Dashboards & APIs",
        desc: "Data-driven admin dashboards and REST APIs built with Node.js and Express, backed by MongoDB.",
        tags: ["Node JS", "Express", "REST API"],
        imgKey: "portfolioOne",
        imgUrl: "",
        link: "",
        featured: false
    }
];

export function resolveProjectImage(project) {
    if (project.imgUrl) return project.imgUrl;
    return builtInImages[project.imgKey] || builtInImages.portfolioOne;
}
