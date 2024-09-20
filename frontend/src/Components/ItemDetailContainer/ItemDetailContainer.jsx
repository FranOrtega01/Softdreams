import './ItemDetailContainer.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../../services/products';
import { ItemDetail } from './ItemDetail';
import { Loading } from '../Loading/Loading';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const ItemDetailContainer = () => {

    const { model } = useParams();

    const [load, setLoad] = useState(true);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [otherProdsArray, setOtherProdsArray] = useState([]);

    const fetchProducts = async () => {
        setLoad(true);
        setError('');
        try {
            const products = await getProducts();
            const selectedProduct = products.find(p => p.modelo === model);
            setProduct(selectedProduct);
            setOtherProdsArray(products.filter(p => p.modelo !== model).sort((a, b) => a.modelo - b.modelo));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [model]);


    return (
        <section className='prodDetailContainer'>
            {load ? (
                <Loading />
            ) : !error ? (
                <>
                    <ItemDetail product={product} />
                    <aside className="prodDetailInfo">
                        <h2>Colchones Disponibles</h2>
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                            spaceBetween={20}
                            slidesPerView={3}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            breakpoints={{
                                300: {
                                    slidesPerView: 2,
                                },
                                520: {
                                    slidesPerView: 3,
                                },
                                763: {
                                    slidesPerView: 4,
                                },
                                1000: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {otherProdsArray.map((p, index) => (
                                <SwiperSlide key={index}>
                                    <Link className='slide shadow' to={`/products/${p.modelo}`}>
                                        <img src={p.thumbnails[0]} alt={p.modelo} />
                                        {p.modelo}
                                    </Link>
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-prev">
                                <ArrowLeft color='black' size={32} />
                            </div>
                            <div className="swiper-button-next">
                                <ArrowRight color='black' size={32} />
                            </div>
                        </Swiper>
                    </aside>

                </>
            ) : (
                <p>{error}</p>
            )}
        </section>
    );
};
