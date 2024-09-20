import React from 'react'
import { Link } from 'react-router-dom';

export const RedirectIcon = ({logo, alt,url, index = 0, ...props }) => {

    let padding = 10;
    let height = 35;

    const style = {
        width: height,
        position: "fixed",
        right: padding,
        zIndex: 2,
        cursor: "pointer"
    }

    return (
        <Link target='_blank' to={url}>
            <img style={{ ...style, bottom: padding * (index + 1) + (index) * height }} {...props} src={logo} alt={alt} />
        </Link>
    )
}

