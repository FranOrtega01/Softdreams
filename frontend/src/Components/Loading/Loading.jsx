import React from 'react'
import { Spinner } from 'react-bootstrap'
import icon from '../../assets/favicon.png'

export const Loading = () => {
  return (
    <>
      <div className='loader'>
        <img className='shadow' src={icon} alt="SoftDreams - El placer de descansar" />
        <Spinner />
      </div>
    </>
  )
}
