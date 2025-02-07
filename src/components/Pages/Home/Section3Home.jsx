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
                        <p>I’m Tom Latham, a Senior UX Designer with over 14 years of hands-on experience in User Experience, Product Analytics, and Strategic Thinking.</p>
                        <br />
                        <p>Currently, I’m dedicated to creating user experiences that harness AI to enhance data visualization, predictive modeling, and insights for users across various domains at Qlik.</p>
                        <br />
                        <p>For a more comprehensive understanding of my qualifications and career achievements, please visit my LinkedIn profile .</p>
                        </div>

                        <a href="/Resume/resume.pdf" download><button>Donwload Resume</button></a>
                    </div>
                </div>

            </div>
        </div>
    )
}
