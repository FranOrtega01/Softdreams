import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.scss";
import logo from '../../assets/SD-sinSlogan.png';
import { MessageCircle } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import config from '../../config/config';
import slogan from '../../assets/slogan.png'

export const Footer = () => {

    const media = [
        {
            icon: <MessageCircle />,
            to: config.wpp,
            alt: "WhatsApp",
            color: "#000",
            target: "_blank"
        },
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

    const footerNavItems = [
        {
            text: "Nosotros",
            to: "/nosotros"
        },
        {
            text: "Contacto",
            to: "/contacto"
        }
    ]

    return (
        <footer>
            <Link className='logo' to={'/'}>
                <img src={logo} alt="SoftDreams" />
            </Link>
            <img className='slogan' src={slogan} alt="El placer de descansar" />
            <div className='footerNav'>
                {footerNavItems.map(e => <Link key={`Footer Nav Item - ${e.text}`} to={e.to} >{e.text}</Link>)}
            </div>
            <div className='media'>
                {media.map(m => <Link key={`${m.alt}`} to={m.to} target={m.target} >{m.icon}</Link>)}
            </div>
            <p>• © {new Date().getFullYear()} Soft Dreams. Todos los derechos reservados •</p>
        </footer>
    )
}
