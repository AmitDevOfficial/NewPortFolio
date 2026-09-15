import { useState } from "react";
import "./section3home.css";
import { motion } from 'framer-motion';
import { loadResume } from "../../../utils/resumeStore";
import { resolveAboutImage } from "../../../data/aboutData";
import { loadAbout } from "../../../utils/aboutStore";

export default function Section3Home() {
    const [resume] = useState(() => loadResume());
    const [about] = useState(() => loadAbout());

    return (
        <div id='about' className='container section-spacing'>
            <div className='section3HomeMain'>

                <motion.div
                    className="section3HomeLeft"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="section3AboutImg">
                        <img src={resolveAboutImage(about)} alt="Amit Vishwakarma" />
                    </div>
                </motion.div>

                <motion.div
                    className="section3HomeRight"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="section3RightContent">
                        <span className="socialSubTitle">{about.tag}</span>
                        <h2>{about.heading}</h2>
                        <div className='section3Para'>
                            {about.paragraphs.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <a href={resume.url} download={resume.fileName}><button>Download Resume</button></a>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
