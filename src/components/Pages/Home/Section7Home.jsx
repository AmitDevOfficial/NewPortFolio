import React from 'react'
import "./section7home.css";
import html from "../images/TopSkills Icons/html.png"
import css from "../images/TopSkills Icons/css.png"
import javascript from "../images/TopSkills Icons/js2.png"
import bootstrap from "../images/TopSkills Icons/bootstrap2.png"
import wordpress from "../images/TopSkills Icons/wordpress.png"
import shopify from "../images/TopSkills Icons/shopify.png"
import figma from "../images/TopSkills Icons/figma.png"
import react from "../images/TopSkills Icons/react.png"
import node from "../images/TopSkills Icons/node.png"
import mongodb from "../images/TopSkills Icons/mongodb.png"
import express from "../images/TopSkills Icons/express-js.png"


export default function Section7Home() {
    return (
        <div id="section7Home" className='container'>
            <div className="mainSection7Home">
                <span className='socialSubTitle'>Hey i am Section7</span>
                <h1>Tools I use</h1>
                <div id="toolSection" className="socialmediaHomeOne">
                    <span className='socialSubTitle tools'>Primary Skills on</span>
                    <ul className='toolOne'>
                        <li><img src={html} alt="" /></li>
                        <li><img src={css} alt="" /></li>
                        <li><img src={javascript} alt="" /></li>
                        <li><img src={bootstrap} alt="" /></li>
                        <li><img src={wordpress} alt="" /></li>
                        <li><img src={shopify} alt="" /></li>
                        {/* <li><img src={figma} alt="" /></li> */}
                    </ul>
                    <ul className='toolTwo'>
                        <li><img src={react} alt="" /></li>
                        <li><img src={node} alt="" /></li>
                        <li><img src={mongodb} alt="" /></li>
                        <li><img src={express} alt="" /></li>
                    </ul>
                </div>

                <div id="toolSection" className="socialmediaHomeOne toolSectionTwo">
                    <span className='socialSubTitle tools'>Secondary Skills on</span>
                    <ul className='toolOne'>
                        <li><img src={html} alt="" /></li>
                        <li><img src={css} alt="" /></li>
                        <li><img src={javascript} alt="" /></li>
                        <li><img src={bootstrap} alt="" /></li>
                        <li><img src={wordpress} alt="" /></li>
                        <li><img src={shopify} alt="" /></li>
                        {/* <li><img src={figma} alt="" /></li> */}
                    </ul>
                    <ul className='toolTwo'>
                        <li><img src={figma} alt="" /></li>
                        <li><img src={node} alt="" /></li>
                        <li><img src={mongodb} alt="" /></li>
                        <li><img src={express} alt="" /></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
