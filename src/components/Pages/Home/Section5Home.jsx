import React from 'react';
import "./section5home.css";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Section5Home() {
    return (
        <div id='section5Home' className='container'>
            <div className="mainSection5home">
                <div className="mainSection5homeHeading">
                    <span className='socialSubTitle'>Here is a sample of projects I've worked on.</span>
                    <h1>Selected projects</h1>
                </div>
                <div className="selectedProjects">
                    <div className="projectOne">
                        <div className="pojectOneContent">
                            <div className='bgProjectSection'>
                                <span className='socialSubTitle'>E-Commerce Redesign</span>
                                <h3>Boosting Conversions by 40%</h3>
                                <p>Discover how our strategic UX/UI enhancements transformed a struggling e-commerce site into a revenue-generating powerhouse.</p>
                                <div className="learnMore">
                                    <div>
                                        <span><FaLongArrowAltRight /></span>
                                    </div>
                                    <div>
                                        <p className='learnMorePara'>Learn More About This Case Studyn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pojectOneContent">
                            <div className='bgProjectImg'>
                            </div>
                        </div>
                    </div>
                    <div className="projectOne">
                        <div className="pojectOneContent">
                            <div className='bgProjectSection'>
                                <span className='socialSubTitle'>E-Commerce Redesign</span>
                                <h3>Boosting Conversions by 40%</h3>
                                <p>Discover how our strategic UX/UI enhancements transformed a struggling e-commerce site into a revenue-generating powerhouse.</p>
                                <div className="learnMore">
                                    <div>
                                        <span><FaLongArrowAltRight /></span>
                                    </div>
                                    <div>
                                        <p className='learnMorePara'>Learn More About This Case Studyn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pojectOneContent">
                            <div className='bgProjectImg1'>
                            </div>
                        </div>
                    </div>
                    <div className="projectOne">
                        <div className="pojectOneContent">
                            <div className='bgProjectSection'>
                                <span className='socialSubTitle'>E-Commerce Redesign</span>
                                <h3>Boosting Conversions by 40%</h3>
                                <p>Discover how our strategic UX/UI enhancements transformed a struggling e-commerce site into a revenue-generating powerhouse.</p>
                                <div className="learnMore">
                                    <div>
                                        <span><FaLongArrowAltRight /></span>
                                    </div>
                                    <div>
                                        <p className='learnMorePara'>Learn More About This Case Studyn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pojectOneContent">
                            <div className='bgProjectImg2'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
