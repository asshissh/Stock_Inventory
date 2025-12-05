import React from "react"
import "../../styles/components/Forms/ContactForm.css";

const ContactForm = ({ onOpen,onClose }) => {
    if(!onOpen) return null;
    return(
        <div className="overlay">
            <div className="contact-form">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <h2 className="sora">Contact Me</h2>
                <form>
                    <input type="text" placeholder="Name" className="outfit"/>
                    <input type="email" placeholder="Email" className="outfit"/>
                    <textarea placeholder="Description" className="outfit"></textarea>
                    <button type="submit" className="outfit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )

}
export default ContactForm