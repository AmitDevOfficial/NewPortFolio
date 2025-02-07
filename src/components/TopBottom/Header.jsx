import { BsMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./header.css";
import myImg from "../Pages/images/myImg.jpg";



export default function Header(props) {
   

    return (
        <header>
            <div className="mainHeader container">
                <div className="leftside">
                    <Link to="/"><img src={myImg} width={100} alt="" /></Link>
                </div>
                <div className="rightside">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li> <Link to="/about">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="rightSideone">
                    {/* <button class="custom-btn btn-11">Read More<div class="dot"></div></button> */}
                    <div className="themeChangeIcon">
                    {props.mode === "dark" ? (
                         <span className="icons"><FiSun onClick={props.toggleMode} /></span>
                    ) : (
                        <span className="icons"><BsMoonStarsFill mode={props.mode} onClick={props.toggleMode} /></span>
                    )}
                    </div>
                
                    <button className="custom-btn btn-11">Hire Me<div className="dot"></div></button>
                </div>
            </div>
        </header>
    )
}
