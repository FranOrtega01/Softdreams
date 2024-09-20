import React from 'react'
import { ItemContainer } from '../Components/ItemContainer/ItemContainer'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import arrayanes from '../assets/empresas/arrayanes-min.png'
import donJusto from '../assets/empresas/donJusto-min.png'
import elCondado from '../assets/empresas/elCondado-min.png'
import rioTigre from '../assets/empresas/rioTigre-min.png'
import terrazas from '../assets/empresas/terrazas-min.png'
import slide3 from '../assets/banner2.png'
import './Home.scss';

export const Home = () => {
  const enterprises = [
    {
      img: arrayanes,
      alt: "Arrayanes Apartments"
    },
    {
      img: donJusto,
      alt: "Hacienda Don Justo"
    },
    {
      img: elCondado,
      alt: "Hosteria El Condado"
    },
    {
      img: rioTigre,
      alt: "Rio Tigre Hotel"
    },
    {
      img: terrazas,
      alt: "Terrazas de Colon"
    },
  ]

  const carouselArray = [...enterprises, ...enterprises];

  return (
    <section>
      <div className="slide">
        <img style={{}} src={slide3} alt="SoftDreams - El placer de descansar" />
      </div>
      <ItemContainer />
      <div className='enterprisesContainer'>

        <h2 className='text-center my-5'>Empresas que nos eligen</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={200}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
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
              slidesPerView: 5,
            },
          }}
        >
          {carouselArray.map((p, index) => (
            <SwiperSlide key={index}>
              <div className="enterprises">
                <img src={p.img} alt={p.alt} />
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section >
  )
}
