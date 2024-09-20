import React from 'react'
import wppLogo from '../../assets/wpp.png'
import igLogo from '../../assets/ig.webp'
import { RedirectIcon } from './RedirectIcon.jsx';
import config from '../../config/config.js';


export const RedirectIconContainer = () => {
    const RIcons = [
        {
            logo: igLogo,
            alt: "SoftDreams Instagram",
            url: config.instagram
        },
        {
            logo: wppLogo,
            alt: "SoftDreams WhatsApp",
            url: config.wpp
        },
    ]
    return (
        <>
            {RIcons.map((icon, index) =>
                <RedirectIcon key={`${index}, ${icon.alt}`}
                    index={index}
                    url={icon.url}
                    logo={icon.logo}
                    alt={icon.alt}
                />)}
        </>
    )
}
