import React from 'react'

export const FichaProducto = ({ product }) => {
    return (
        <div className='prodDetailInfo'>
            <h2>Ficha Técnica</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Modelo</th>
                        <td>{product.modelo}</td>
                    </tr>
                    <tr>
                        <th>Medidas</th>
                        <td>{product.medidas}</td>
                    </tr>
                    <tr>
                        <th>Altura Colchón</th>
                        <td>{product.altura}</td>
                    </tr>
                    <tr>
                        <th>Núcleo</th>
                        <td>{product.nucleo}</td>
                    </tr>
                    <tr>
                        <th>Tela</th>
                        <td>{product.tela}</td>
                    </tr>
                    <tr>
                        <th>Peso</th>
                        <td>{product.peso}</td>
                    </tr>
                    <tr>
                        <th>Garantía</th>
                        <td>{product.garantia}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
