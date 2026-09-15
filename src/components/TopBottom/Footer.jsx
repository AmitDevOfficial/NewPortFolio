import { useState } from "react";
import "./footer.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { loadContact } from "../../utils/contactStore";

export default function Footer() {
    const [contact] = useState(() => loadContact());

    return (
        <footer>
            <div className="container footerMain">
                <div className="footerBrand">
                    <h3>Amit Vishwakarma</h3>
                    <p>Web Developer crafting fast, responsive WordPress, Shopify &amp; MERN experiences.</p>
                </div>

                <div className="footerSocial">
                    <a href={`mailto:${contact.email}`} aria-label="Email"><HiOutlineMail /></a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IoLogoInstagram /></a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>
            </div>

            <div className="footerBottom">
                <p>All Rights Reserved &copy; <span style={{ color: "var(--primary)" }}>Amit Vishwakarma</span> {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}
