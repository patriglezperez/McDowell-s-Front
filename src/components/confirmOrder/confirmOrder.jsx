import React from 'react'

export default function ConfirmOrder() {
    return (
        <section className='confirm-order'>
            <p className='section-title'>Resumen de tu pedido</p>
            <span className='price-wrapper'>
                <p className='total'>TOTAL</p>
                <b className='total-price'>€12.95</b>
            </span>
            <button className='action-button'>CONFIRMAR PEDIDO</button>
            <button className='action-button'>CANCELAR PEDIDO</button>
        </section>
    )
}
