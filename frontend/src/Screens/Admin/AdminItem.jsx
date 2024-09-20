import React from 'react'
import { Overlay } from '../../Components/Overlay/Overlay'
import { Pencil } from 'lucide-react'

export const AdminItem = ({ list, product, openModal }) => {
    return (
        <>
            {!list ?
                (<article onClick={() => openModal(product.modelo)} className='product shadow'>
                    <Overlay> <Pencil size={48} color='white' /> </Overlay>
                    <div>
                        <img src={product.thumbnails[0]} alt={product.modelo} />
                    </div>
                    <h2>{product.modelo}</h2>
                </article>
                )
                :
                <article onClick={() => openModal(product.modelo)} className='product list shadow'>
                    <h2>{product.modelo}</h2>
                    <p>{product.tela}</p>
                    <p>{product.medidas}</p>
                    <p>{product.altura}</p>
                    <p>{product.peso}</p>
                </article>
            }
        </>

    )
}
