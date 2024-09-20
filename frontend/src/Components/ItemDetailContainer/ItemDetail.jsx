import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import config from '../../config/config';
import { FichaProducto } from './FichaProducto';
import { Weight } from 'lucide-react';
import nucleo from '../../assets/nucleo.png'
import tela from '../../assets/tela.png'
import altura from '../../assets/altura.png'


export const ItemDetail = ({ product }) => {
    const [currentImg, setCurrentImg] = useState(0)

    function imgChangeFwd() {
        currentImg === (product.thumbnails.length - 1) ? setCurrentImg(0) : setCurrentImg(currentImg + 1)
    }
    function imgChangeBack() {
        currentImg === 0 ? setCurrentImg(product.thumbnails.length - 1) : setCurrentImg(currentImg - 1)
    }
    return (
        <>
            <div className='prodDetailMain'>
                <div className='detailSubImg'>
                    {product.thumbnails?.map((image, index) =>
                        <img width={100} key={`Detail SubImg - ${product.modelo} - ${index}`}
                            src={image} alt={product.modelo}
                            onClick={() => setCurrentImg(index)}
                            className={index === currentImg ? 'current' : ''}
                        />
                    )}
                </div>
                <div className='detailImg'>
                    <img src={product?.thumbnails[currentImg]} alt={product.modelo} />
                    {product.thumbnails[1] &&
                        (
                            <>
                                <IoIosArrowForward className='arrowFwd' onClick={imgChangeFwd} />
                                <IoIosArrowBack className='arrowBack' onClick={imgChangeBack} />
                            </>
                        )}

                </div>
                <div className='detailInfo'>
                    <h1>{product.modelo}</h1>
                    <div dangerouslySetInnerHTML={{ __html: product.descripcion }}></div>
                    <Link className='text-center' to={`${config.wpp}?text=!Hola! Quería hacer una consulta sobre el colchón ${product.modelo}`} target={'_blank'}>Solicitar Colchon</Link>
                </div>
            </div>
            <div className='prodFeatureInfo'>
                <div className='prodFeature '>
                    <img className='shadow' src={nucleo} alt="Nucleo" />
                    <span>
                        {product.nucleo}
                    </span>
                </div>
                <div className='prodFeature'>
                    <img className='shadow' src={tela} alt="Tela" />
                    <span>
                        {product.tela}
                    </span>
                </div>
                <div className='prodFeature'>
                    <div className='shadow'>
                        <Weight color='white' strokeWidth={3} size={32} />
                    </div>
                    <span>
                        {product.peso}
                    </span>
                </div>

                <div className='prodFeature'>
                    <img className='shadow' src={altura} alt="Altura" />
                    <span>
                        {product.altura}
                    </span>
                </div>
            </div>
            <FichaProducto product={product} />
        </>
    )
}
