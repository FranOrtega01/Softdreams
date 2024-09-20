import React from 'react'
import { Star, Shield, Award, Clock } from 'lucide-react';
import mockImg from '../assets/muestra.jpg';
import './AboutUs.scss'
export const AboutUs = () => {
  return (
    <section className="container" id='AboutUs'>
      <h1 className='text-center'>Descubre la Excelencia en Descanso</h1>

      <article className="article-card shadow">
        <div className="content">
          <h2 className='bold'> <Star className='icon' /> Nuestra Misión Estelar</h2>
          <p>
            En SoftDreams, nuestra misión es ofrecer el mejor descanso a nuestros clientes a través de productos de calidad excepcionales. Con más de 30 años de trayectoria en la industria, nos hemos dedicado principalmente a atender las necesidades del sector hotelero, creando colchones que proporcionan comodidad y bienestar a miles de huéspedes.
          </p>
          <div className="highlight">
            <span className="bold">30+ años</span> de experiencia en la industria
          </div>
        </div>
        <div className="image-container">
          <img src={mockImg} />
        </div>
      </article>

      <article className="article-card shadow">
        <div className="content">
          <h2 className='bold'> <Shield className='icon' /> Pilares de Confianza</h2>
          <p>
            Nuestra empresa se basa en los principios de integridad y respeto. Cada colchón que fabricamos refleja nuestro compromiso con la honestidad y la transparencia en todos nuestros procesos. Creemos que el trato justo con nuestros clientes, proveedores y colaboradores es fundamental para construir relaciones duraderas y de confianza.
          </p>
          <ul className="check-list">
            <li>Integridad en cada acción</li>
            <li>Respeto mutuo</li>
            <li>Transparencia total</li>
          </ul>
        </div>
        <div className="image-container">
          <img src={mockImg} />
        </div>
      </article>

      <article className="article-card shadow">
        <div className="content">
          <h2 className='bold'> <Award className='icon' /> La Excelencia en Cada Detalle</h2>
          <p>
            La calidad es el corazón de SoftDreams. Desde la selección de los materiales hasta la manufactura de cada colchón, nos aseguramos de que cada producto cumpla con los más altos estándares del mercado. Nuestros colchones están diseñados no solo para proporcionar un descanso reparador, sino también para resistir el paso del tiempo, garantizando una inversión duradera y satisfactoria para nuestros clientes.
          </p>
          <div className="highlight">
            <p className="bold">Nuestro Compromiso:</p>
            <p>Cada colchón es una obra maestra de confort y durabilidad.</p>
          </div>
        </div>
        <div className="image-container">
          <img src={mockImg} />
        </div>
      </article>

      <article className="article-card shadow">
        <div className="content">
          <h2 className='bold'> <Clock className='icon' /> Una Historia de Innovación Continua</h2>
          <p>
            Con 30 años de experiencia a nuestras espaldas, hemos evolucionado y adaptado nuestras técnicas y diseños a las cambiantes necesidades del mercado. Nuestra dedicación al perfeccionamiento continuo nos ha permitido posicionarnos como líderes en la fabricación de colchones para la industria hotelera, siempre buscando hacer de cada estancia una experiencia inolvidable.
          </p>
          <div className="icon-text">
            <Clock className='icon-circle' />
            <span className="bold">Tres décadas de evolución constante</span>
          </div>
        </div>
        <div className="image-container">
          <img src={mockImg} />
        </div>
      </article>

      <div className="closing-statement">
        <p>
          En SoftDreams, seguimos comprometidos a brindarte lo mejor en cada colchón. Te invitamos a experimentar la diferencia de un descanso de calidad.
        </p>
        <p className="bold">
          ¡Tu satisfacción es nuestra prioridad!
        </p>
      </div>
    </section>
  )
}