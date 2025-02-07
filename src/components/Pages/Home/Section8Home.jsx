import React from 'react';
import "./section8home.css";
import clientOne from "../images/HomeImg/client1.png"
import { LuQuote } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
// import clientTwo from "../images/HomeImg/client2.png"
// import clientThree from "../images/HomeImg/client3.png"

export default function Section8Home() {
    return (
        <div id="section8Home" className='container'>
            <div className="mainsection8Home">
                <span className='socialSubTitle'>What Clients Say</span>
                <h1>Commendations</h1>
                <div className="mainClientSay">
                    <div className="clientLeft">
                        <img src={clientOne} alt="" />
                        <span className='socialSubTitle'>What Clients Say</span>
                        <h5>Jhon Doe</h5>
                        <p>CEO of Officer</p>
                    </div>
                    <div className="clientRight">
                        <div className="clientInnerOne">
                            <div>
                               <span className='quote'><LuQuote /></span>
                            </div>
                            <div>
                                <p>two</p>
                            </div>
                        </div>
                        <div className="clientInnerTwo">
                            <div className="contentWithIcon">
                                <div className='clientInfo'>
                                    <h5>Android App Development</h5>
                                    <p>via Upwork - Mar 4, 2015 - Aug 30, 2021 test</p>
                                </div>
                                <div className='rating'>
                                    <div className='ratingStar'>
                                        <IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, illo repudiandae quos facere id, ducimus tempore natus, optio temporibus nihil beatae consectetur dicta unde magni quo. Iste reiciendis illo odio dolorum fuga?repudiandae quos facere id, ducimus tempore natus, optio temporibus nihil beatae</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
