import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { X } from 'lucide-react';


import config from '../../config/config';

export const Navbar = () => {

    const [open, setOpen] = useState(false)

    const site = useParams();

    const socialLinks = [
        {
            icon: <Instagram size={20} color='white'/>,
            to: config.instagram,
            alt: "Instagram",
            color: "#000",
            target: "_blank"
        },
        {
            icon: <Facebook size={20} color='white' />,
            to: config.facebook,
            alt: "Facebook",
            target: "_blank"
        },
    ];

    useEffect(() => {
        setOpen(false)
        
    }, [site])
    
    return (
        <>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/nosotros'}>Nosotros</Link>
                <Link to={'/contacto'}>Contacto</Link>
            </nav>
            <Menu size={32} onClick={() => setOpen(true)} color='white' className='btnMenu' />
            <div className={`sideMenu ${open ? "open": ''}`}>
                <X size={32} color='white' className='btnMenuClose' onClick={() => setOpen(false)} />
                <nav className='menuNavbar'>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/nosotros'}>Nosotros</Link>
                    <Link to={'/contacto'}>Contacto</Link>
                </nav>
                <div className='menuMediaContainer'>
                    <p>Seguinos</p>
                    <div>
                        {socialLinks.map(e =>
                            <Link key={e.alt} to={e.to} target={e.target}>{e.icon}</Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
