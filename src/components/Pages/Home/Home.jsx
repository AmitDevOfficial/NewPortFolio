import React from 'react';
import "./home.css";
import { Typewriter } from 'react-simple-typewriter';
import rightImg from "../images/sr-designer.png";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoLogoReact } from "react-icons/io5";
import { FaWordpressSimple } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import Section2Home from './Section2Home';
import Section3Home from './Section3Home';
import Section4Home from './Section4Home';
import Section5Home from './Section5Home';
import Section6Home from './Section6Home';
import Section7Home from './Section7Home';
import Section8Home from './Section8Home';



export default function Home() {
  return (
    <>
    <div id="home" className='container myHome'>
      <div className="homeLeftColoum">
        <span className='subTitle'>hi there i'm</span>
        <h1>hi, i'm <span className='myName'>Amit Vishwakarma</span></h1>
        <div className='myProfession'><span style={{ color: "var(--secondary)", textTransform: "lowercase" }}>a</span>
          <Typewriter
            words={[' Web Developer', ' Web Designer', ' MERN Stack Developer', ' PHP Developer', ' WordPress Developer', ' Shopify Developer!']}
            loop={5}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={20}
            delaySpeed={1000}
          />
        </div>
        <p>I help businesses build fast, user-friendly, and SEO-optimized websites using WordPress and Shopify. With 2.5+ years of hands-on experience, I turn ideas into high-performing digital platforms that drive results.</p>

        <div className="socialMediaMainHome">

          <div className="socialmediaHomeOne">
            <span className='socialSubTitle'>find with me</span>
            <ul>
              <li><Link to="https://www.facebook.com/" target="_blank"><FaFacebookF /></Link></li>
              <li><Link to="#" target="_blank"><IoLogoInstagram /></Link></li>
              <li><Link to="#" target="_blank"><FaLinkedinIn /></Link></li>
            </ul>
          </div>

          <div className="socialmediaHomeOne">
            <span className='subTitle socialSubTitle'>best skill on</span>
            <ul>
              <li><Link className="bestSkills" to="#"><IoLogoReact /></Link></li>
              <li><Link className="bestSkills1" to="#"><FaWordpressSimple /></Link></li>
              <li><Link className="bestSkills2" to="#"><FaShopify /></Link></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="homeRightColoum">
        <img src={rightImg} alt="" />
      </div>
    </div>
    <Section2Home />
    <Section3Home />
    <Section4Home />
    <Section5Home />
    <Section6Home />
    <Section7Home />
    <Section8Home />
    </>
   
  )
}
