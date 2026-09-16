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
    const [moreExpanded, setMoreExpanded] = useState(false);
    const [allProjects] = useState(() =>
        loadProjects().map((project, i) => ({
            ...project,
            _lineColor: getTagLineColor(i)
        }))
    );

    const projects = allProjects.filter((p) => p.featured);
    const moreProjects = allProjects.filter((p) => !p.featured);

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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
                </div>

                <AnimatePresence>
                    {showMore && moreProjects.length > 0 && (
                        <motion.div
                            className="selectedProjects moreProjectsGrid"
                            style={{ overflow: moreExpanded ? "visible" : "hidden" }}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                            onAnimationComplete={() => setMoreExpanded(true)}
                        >
                            {moreProjects.map((project, i) => renderCard(project, i))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {moreProjects.length > 0 && (
                    <button className="moreProjectsBtn" onClick={() => setShowMore((prev) => {
                        const next = !prev;
                        if (!next) setMoreExpanded(false);
                        return next;
                    })}>
                        {showMore ? "Show Less" : "More Projects"}
                    </button>
                )}
            </div>
        </div>
    )
}
