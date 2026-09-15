import { BsMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import "./header.css";
import myImg from "../Pages/images/myImg.jpg";
import { useEffect, useState } from "react";

export default function Header(props) {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={isScrolled ? "header scroll" : "header"}>
            <div className="mainHeader container">
                <div className="leftside">
                    <a href="#home">
                        <span className="avatarRing">
                            <img src={myImg} alt="Amit Vishwakarma" />
                        </span>
                        <span className="brandName">Amit Vishwakarma</span>
                    </a>
                </div>

                <div className="rightSideone">
                    <div className="themeChangeIcon">
                        {props.mode === "dark" ? (
                            <span className="icons" onClick={props.toggleMode} aria-label="Switch to light mode"><FiSun /></span>
                        ) : (
                            <span className="icons" onClick={props.toggleMode} aria-label="Switch to dark mode"><BsMoonStarsFill /></span>
                        )}
                    </div>

                    <a href="https://wa.me/917974743671" target="_blank" rel="noopener noreferrer" className="custom-btn btn-11">Hire Me<div className="dot"></div></a>
                </div>
            </div>
        </header>
    )
}
