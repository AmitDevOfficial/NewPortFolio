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
    },
    {
        "id": "project-1790007010768",
        "tag": "WordPress Development",
        "title": "Business Website",
        "desc": "Built a custom multi-step form plugin that lets users submit raw voice recordings, which the admin converts into finished music tracks and delivers back.",
        "tags": [
            "WordPress",
            "Custom Theme",
            "Custom Plugin"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790007174950-1.png",
        "link": "https://singifyme.com",
        "featured": false
    },
    {
        "id": "project-1790007526953",
        "tag": "WordPress Ecommerce",
        "title": "Business Website",
        "desc": "A Lord Krishna e-commerce website powered by WordPress, Elementor, and a premium theme, featuring a wide collection of Krishna products, including Baby Krishna.",
        "tags": [
            "WordPress",
            "Woo-commerce",
            "Elementor"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790008111452-1.png",
        "link": "https://gopalgallery.com",
        "featured": false
    },
    {
        "id": "project-1790007862712",
        "tag": "WordPress Development",
        "title": "E-commerce Website",
        "desc": "WordPress e-commerce website for Kala Kahani, showcasing handcrafted, sustainable home décor made by global artisans.",
        "tags": [
            "WordPress",
            "Woo-commerce",
            "Elementor"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790008111462-2.png",
        "link": "https://kalakahani.com/",
        "featured": false
    },
    {
        "id": "project-1790008002231",
        "tag": "WordPress Development",
        "title": "E-commerce Website",
        "desc": "A business website for Vizona, an Australian pole manufacturer and lighting wholesaler offering LED, solar, and sports lighting, along with street poles, high mast poles, and communication towers.",
        "tags": [
            "WordPress",
            "Woo-commerce",
            "Elementor"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790008111463-3.png",
        "link": "https://www.vizona.com.au/",
        "featured": false
    },
    {
        "id": "project-1790009287857",
        "tag": "WordPress Development",
        "title": "Service Website",
        "desc": "Website for Beyond Wonder Media, a Southeast Asian kids' media company producing safe, high-engagement children's content for YouTube, TikTok, and Facebook.",
        "tags": [
            "WordPress",
            "Custom Theme",
            "Service"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790010211689-1.png",
        "link": "https://beyondwondermedia.com/",
        "featured": false
    },
    {
        "id": "project-1790009747702",
        "tag": "WordPress Development",
        "title": "Listing Business",
        "desc": "Local business directory website for Dwarka, Delhi, featuring business listings, events, real estate, used cars, and job openings.",
        "tags": [
            "WordPress",
            "Elementor",
            "Paid - Theme"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790010211689-2.png",
        "link": "https://mydwarka.in/",
        "featured": false
    },
    {
        "id": "project-1790009902350",
        "tag": "WordPress Development",
        "title": "Informational Website",
        "desc": "WordPress website for Debt Distress Rescue, a Brisbane insolvency firm offering debt management, liquidation, and business restructuring services.",
        "tags": [
            "WordPress",
            "Informational",
            "Elementor"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790010211690-3.png",
        "link": "https://debtdistressrescue.com.au/",
        "featured": false
    },
    {
        "id": "project-1790010022758",
        "tag": "WordPress Development",
        "title": "Electrician Service Website",
        "desc": "A service website for Voltfix Electrical, a licensed electrical contractor serving Brisbane, Logan, and Redlands. The site presents residential and commercial electrical services",
        "tags": [
            "WordPress",
            "Service",
            "Elementor"
        ],
        "imgKey": "portfolioOne",
        "imgUrl": "/uploads/featuredWork-1790010211691-4.png",
        "link": "https://www.voltfixelectrical.com.au/",
        "featured": false
    }
];

export function resolveProjectImage(project) {
    if (project.imgUrl) return project.imgUrl;
    return builtInImages[project.imgKey] || builtInImages.portfolioOne;
}
