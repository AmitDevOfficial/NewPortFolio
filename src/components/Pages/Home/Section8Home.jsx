import { useState } from "react";
import "./section8home.css";
import { motion } from 'framer-motion';
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { loadContact } from "../../../utils/contactStore";

export default function Section8Home() {
    const [contact] = useState(() => loadContact());

    return (
        <div id="contact" className='container section-spacing'>
            <motion.div
                className="mainsection8Home"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className='socialSubTitle'>Let's Work Together</span>
                <h2>Have a project in mind?</h2>
                <p className="contactLead">I'm currently available for freelance work and full-time opportunities. Whether you need a WordPress site, a Shopify store, or a full-stack web app — let's talk.</p>

                <div className="contactActions">
                    <a href={`mailto:${contact.email}`} className="heroBtn contactBtnPrimary"><HiOutlineMail /> {contact.email}</a>
                </div>

                <div className="contactSocial">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IoLogoInstagram /></a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>
            </motion.div>
        </div>
    )
}
