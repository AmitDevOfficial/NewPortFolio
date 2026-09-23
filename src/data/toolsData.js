import html from "../components/Pages/images/TopSkills Icons/html.png";
import css from "../components/Pages/images/TopSkills Icons/css.png";
import javascript from "../components/Pages/images/TopSkills Icons/js2.png";
import bootstrap from "../components/Pages/images/TopSkills Icons/bootstrap2.png";
import wordpress from "../components/Pages/images/TopSkills Icons/wordpress.png";
import shopify from "../components/Pages/images/TopSkills Icons/shopify.png";
import figma from "../components/Pages/images/TopSkills Icons/figma.png";
import react from "../components/Pages/images/TopSkills Icons/react.png";
import node from "../components/Pages/images/TopSkills Icons/node.png";
import mongodb from "../components/Pages/images/TopSkills Icons/mongodb.png";
import express from "../components/Pages/images/TopSkills Icons/express-js.png";

export const builtInToolImages = {
    html,
    css,
    javascript,
    bootstrap,
    wordpress,
    shopify,
    figma,
    react,
    node,
    mongodb,
    express,
};

export const builtInToolImageOptions = [
    { key: "html", label: "HTML5" },
    { key: "css", label: "CSS3" },
    { key: "javascript", label: "JavaScript" },
    { key: "bootstrap", label: "Bootstrap" },
    { key: "react", label: "React JS" },
    { key: "node", label: "Node JS" },
    { key: "express", label: "Express JS" },
    { key: "mongodb", label: "MongoDB" },
    { key: "wordpress", label: "WordPress" },
    { key: "shopify", label: "Shopify" },
    { key: "figma", label: "Figma" },
];

export const defaultTools = [
    {
        "id": "tool-html",
        "imgKey": "html",
        "imgUrl": "",
        "label": "HTML5"
    },
    {
        "id": "tool-css",
        "imgKey": "css",
        "imgUrl": "",
        "label": "CSS3"
    },
    {
        "id": "tool-js",
        "imgKey": "javascript",
        "imgUrl": "",
        "label": "JavaScript"
    },
    {
        "id": "tool-bootstrap",
        "imgKey": "bootstrap",
        "imgUrl": "",
        "label": "Bootstrap"
    },
    {
        "id": "tool-react",
        "imgKey": "react",
        "imgUrl": "",
        "label": "React JS"
    },
    {
        "id": "tool-node",
        "imgKey": "node",
        "imgUrl": "",
        "label": "Node JS"
    },
    {
        "id": "tool-express",
        "imgKey": "express",
        "imgUrl": "",
        "label": "Express JS"
    },
    {
        "id": "tool-mongodb",
        "imgKey": "mongodb",
        "imgUrl": "",
        "label": "MongoDB"
    },
    {
        "id": "tool-wordpress",
        "imgKey": "wordpress",
        "imgUrl": "",
        "label": "WordPress"
    },
    {
        "id": "tool-shopify",
        "imgKey": "shopify",
        "imgUrl": "",
        "label": "Shopify"
    },
    {
        "id": "tool-figma",
        "imgKey": "figma",
        "imgUrl": "",
        "label": "Figma"
    },
    {
        "id": "tool-1790155125577",
        "imgKey": "html",
        "imgUrl": "/uploads/tools-1790155381890-1.png",
        "label": "Laravel"
    },
    {
        "id": "tool-1790155143809",
        "imgKey": "html",
        "imgUrl": "/uploads/tools-1790155174788-2.webp",
        "label": "PHP"
    }
];

export function resolveToolImage(tool) {
    if (tool.imgUrl) return tool.imgUrl;
    return builtInToolImages[tool.imgKey] || builtInToolImages.html;
}
