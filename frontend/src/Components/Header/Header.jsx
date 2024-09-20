import React from 'react'
import './Header.scss';

export const Header = ({children, ...props}) => {
  return (
    <header className={props.className ? props.className : ''}>
      {children}
    </header>
  )
}
