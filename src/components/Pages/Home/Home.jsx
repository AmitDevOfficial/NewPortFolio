import { useState } from "react";
import "./home.css";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { loadResume } from "../../../utils/resumeStore";
import { loadHero } from "../../../utils/heroStore";
import { resolveHeroImage } from "../../../data/heroData";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoReact } from "react-icons/io5";
import { FaWordpressSimple, FaShopify } from "react-icons/fa";
import Section2Home from './Section2Home';
import Section3Home from './Section3Home';
import Section5Home from './Section5Home';
import Section6Home from './Section6Home';
import Section7Home from './Section7Home';
import Section8Home from './Section8Home';

export default function Home() {
  const [resume] = useState(() => loadResume());
  const [hero] = useState(() => loadHero());

  return (
    <>
      <div id="home" className='container myHome'>
        <motion.div
          className="homeLeftColoum"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className='subTitle'>hi there i'm</span>
          <h1>hi, i'm <span className='myName'>Amit Vishwakarma</span></h1>
          <div className='myProfession'>
            <span style={{ color: "var(--secondary)", textTransform: "lowercase" }}>a</span>
            <Typewriter
              words={[' Web Developer', ' Web Designer', ' MERN Stack Developer', ' PHP Developer', ' WordPress Developer', ' Shopify Developer!', 'Laravel Developer']}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={20}
              delaySpeed={1000}
            />
          </div>
          <p>{hero.paragraph}</p>

          <div className="heroCtas">
            <a href="https://wa.me/917974743671" target="_blank" rel="noopener noreferrer" className="heroBtn heroBtnPrimary">Hire Me</a>
            <a href={resume.url} download={resume.fileName} className="heroBtn heroBtnGhost">Download Resume</a>
          </div>

          <div className="socialMediaMainHome">
            <div className="socialmediaHomeOne">
              <span className='socialSubTitle'>find with me</span>
              <ul>
                <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a></li>
                <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IoLogoInstagram /></a></li>
                <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a></li>
              </ul>
            </div>

            <div className="socialmediaHomeOne">
              <span className='subTitle socialSubTitle'>best skill on</span>
              <ul>
                <li><a className="bestSkills" href="#skills" aria-label="React"><IoLogoReact /></a></li>
                <li><a className="bestSkills1" href="#skills" aria-label="WordPress"><FaWordpressSimple /></a></li>
                <li><a className="bestSkills2" href="#skills" aria-label="Shopify"><FaShopify /></a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="homeRightColoum"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <img src={resolveHeroImage(hero)} alt="Amit Vishwakarma illustration" />
        </motion.div>
      </div>

      <Section2Home />
      <Section3Home />
      <Section6Home />
      <Section7Home />
      <Section5Home />
      <Section8Home />
    </>
  )
}
