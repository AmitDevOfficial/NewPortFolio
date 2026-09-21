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
        "id": "wp-business",
        "tag": "WordPress Developmentss123",
        "title": "Digital Marketing Website",
        "desc": "Custom WordPress builds focused on clean design, fast load times, and SEO-friendly structure for small businesses and personal brands.",
        "tags": [
            "WordPress",
            "PHP",
            "SEO"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1789588299003-1.png",
        "link": "https://stackcolon.com",
        "featured": true
    },
    {
        "id": "project-1790006776665",
        "tag": "Laravel Development",
        "title": "Library Management",
        "desc": "Authentication, CRUD operations, role-based access control, book\nissue/return management, subscription validation, PDF book reader,\nsearch & filter, file uploads",
        "tags": [
            "Laravel",
            "Bootstrap",
            "MySQL"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790006910136-1.png",
        "link": "https://cmsguru.in",
        "featured": false
    }
];

export function resolveProjectImage(project) {
    if (project.imgUrl) return project.imgUrl;
    return builtInImages[project.imgKey] || builtInImages.portfolioOne;
}
