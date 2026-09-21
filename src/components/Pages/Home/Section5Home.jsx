import { useState } from "react";
import "./section5home.css";
import { motion, AnimatePresence } from 'framer-motion';
import { resolveProjectImage } from "../../../data/projectsData";
import { loadProjects } from "../../../utils/projectsStore";

const TAG_LINE_COLORS = [
    "var(--primary)",
    "skyblue",
    "#a64dff",
    "#eab308",
    "#22c55e",
];

function getTagLineColor(index) {
    if (index < TAG_LINE_COLORS.length) return TAG_LINE_COLORS[index];
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 70%, 60%)`;
}

export default function Section5Home() {

    const [showMore, setShowMore] = useState(false);
    const [allProjects] = useState(() =>
        loadProjects().map((project, i) => ({
            ...project,
            _lineColor: getTagLineColor(i)
        }))
    );

    const projects = allProjects.slice(0, 3);
    const moreProjects = allProjects.slice(3);

    const renderCard = (project, i) => {
        const CardTag = project.link ? motion.a : motion.div;
        const linkProps = project.link
            ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
            : {};

        return (
            <CardTag
                className="projectCard"
                key={project.id}
                {...linkProps}
                style={{ "--tag-line-color": project._lineColor }}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
            >
                <div className="projectImg" style={{ backgroundImage: `url(${resolveProjectImage(project)})` }}></div>
                <div className="projectBody">
                    <span className='socialSubTitle'>{project.tag}</span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="projectTags">
                        {project.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                </div>
            </CardTag>
        );
    };

    return (
        <div id='projects' className='container section-spacing'>
            <div className="mainSection5home">
                <div className="mainSection5homeHeading">
                    <span className='socialSubTitle'>What I build</span>
                    <h2>Featured Work</h2>
                </div>

                <div className="selectedProjects">
                    {projects.map((project, i) => renderCard(project, i))}
                    <AnimatePresence>
                        {showMore && moreProjects.map((project, i) => renderCard(project, i))}
                    </AnimatePresence>
                </div>

                {moreProjects.length > 0 && (
                    <button className="moreProjectsBtn" onClick={() => setShowMore((prev) => !prev)}>
                        {showMore ? "Show Less" : "More Projects"}
                    </button>
                )}
            </div>
        </div>
    )
}
