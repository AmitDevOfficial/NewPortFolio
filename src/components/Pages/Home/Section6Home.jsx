import "./section6home.css";
import Progress from './Progress';
import { motion } from 'framer-motion';

export default function Section6Home() {

    const skillGroups = [
        {
            title: "Frontend Development",
            skills: [
                { label: "HTML / CSS / JS", value: 92 },
                { label: "React JS", value: 78 },
                { label: "Bootstrap", value: 88 },
            ]
        },
        {
            title: "CMS & E-Commerce",
            skills: [
                { label: "WordPress", value: 92 },
                { label: "Shopify", value: 88 },
                { label: "PHP", value: 75 },
            ]
        },
        {
            title: "Backend & MERN Stack",
            skills: [
                { label: "Node JS", value: 72 },
                { label: "Express JS", value: 70 },
                { label: "MongoDB", value: 68 },
            ]
        }
    ];

    return (
        <div id="skills" className='container section-spacing'>
            <div className="mainSection6Home">
                <div className="mainSection5homeHeading">
                    <span className='socialSubTitle'>What I bring to the table</span>
                    <h2>My Skills</h2>
                </div>

                <div className="mainProgressCard">
                    {skillGroups.map((group, i) => (
                        <motion.div
                            className="progressCards"
                            key={group.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <span className='socialSubTitle'>Skillset</span>
                            <h3>{group.title}</h3>
                            {group.skills.map((skill) => (
                                <Progress key={skill.label} value={skill.value} content={skill.label} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
