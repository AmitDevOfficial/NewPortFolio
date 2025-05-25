import React from 'react';
import "./section3home.css";
import aboutImg from "../images/HomeImg/aboutImg.jpeg";

export default function Section3Home() {
    return (
        <div id='section3Home' className='container'>
            <div className='section3HomeMain'>

                <div className="section3HomeLeft">
                    <div className="section3AboutImg">
                        <img src={aboutImg} alt="" />
                    </div>
                </div>

                <div className="section3HomeRight">
                    <div className="section3RightContent">
                        <h2>Inquisitive and passionate about emerging technology.</h2>
                        <div className='section3Para'>
                        <p>I’m Amit Vishwakarma, a passionate web developer with 2.5+ years of experience in WordPress and Shopify, and I’ve also completed a 6-month MERN stack internship to strengthen my full-stack development skills.</p>
                        <br />
                        <p>Along with CMS platforms, I’ve developed a strong grip on React JS and I'm actively shifting towards modern, scalable, and high-performance front-end development using the latest technologies.</p>
                        <br />
                        <p>If you're looking to hire a developer who understands both traditional CMS and modern JavaScript frameworks, feel free to contact me. You can also download my resume using the button below.</p>
                        </div>

                        <a href="/Resume/resume.pdf" download><button>Donwload Resume</button></a>
                    </div>
                </div>

            </div>
        </div>
    )
}
