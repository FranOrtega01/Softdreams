import React from 'react'
import './Overlay.scss'

export const Overlay = ({children, color}) => {
    return (
        <div className='overlay' style={{backgroundColor: color}}>
            {children && children}
        </div>
    )
}
