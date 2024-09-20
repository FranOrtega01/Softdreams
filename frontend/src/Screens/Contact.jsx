import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { ContactForm } from '../Components/ContactForm/ContactForm';
import config from '../config/config';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import './Contact.scss';


export const Contact = () => {

    const contactLinks = [
        {
            icon: <Phone />,
            text: config.cellphone,
            to: `tel:${config.cellphone}`,
            target: "_blank"
        },
        {
            icon: <Mail />,
            text: config.email,
            to: `mailto:${config.email}`,
            target: "_blank"
        },
        {
            icon: <MapPin />,
            text: config.adress,
            to: `${config.gmaps}`,
            target: "_blank"
        },
    ];

    const socialLinks = [
        {
            icon: <Instagram />,
            to: config.instagram,
            alt: "Instagram",
            color: "#000",
            target: "_blank"
        },
        {
            icon: <Facebook />,
            to: config.facebook,
            alt: "Facebook",
            target: "_blank"
        },
    ];

    return (
        <div >
            <h1 style={{ marginBlock: 50 }} className='text-center'>Contactanos</h1>
            <section className='contactContainer'>
                <section className='infoContainer'>
                    <h2>Información de Contacto</h2>
                    {contactLinks.map((e, idx) =>
                        <div key={`Contact - ${idx}`}>
                            {e.icon}
                            <Link to={e.to} target={e.target}>{e?.text}</Link>
                        </div>)}
                </section>

                <section className='mediaContainer'>
                    <h2>Seguinos</h2>
                    <div>
                        {socialLinks.map(e =>
                            <Link key={e.alt} to={e.to} target={e.target}>{e.icon}</Link>
                        )}
                    </div>
                </section>
                <GoogleReCaptchaProvider reCaptchaKey="6Lc6YUcqAAAAALNTkcOJwk_3f3ZuTWK7dRTUpE6V">
                    <ContactForm className='formContainer' />
                </GoogleReCaptchaProvider>
            </section>
        </div>
    )
}
