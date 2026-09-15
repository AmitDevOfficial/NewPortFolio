import "./whatsapp.css";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/917974743671"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsappFloat"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    )
}
