import React from 'react'
import { Link } from 'react-router-dom'

export const Item = ({ product }) => {
    return (
        <div className='product shadow'>
            <Link className='p-0' to={`/products/${product.modelo}`}>
                <div>
                    <img src={product.thumbnails[0]} alt={product.modelo} />
                </div>
                <h2>{product.modelo}</h2>
                <p>Ver más</p>
            </Link>
        </div>
    )
}
