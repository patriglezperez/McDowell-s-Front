import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import StaticContext from "../../context/staticContext";

export default function ConfirmOrder() {
    const { order, setOrder } = useContext(StaticContext);
    const [orderTotal, setOrderTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (order.menus && order.menus.length > 0) {
            let totalSum = 0;
            totalSum = order.menus.reduce((previousValue, currentValue) => previousValue + currentValue);
            setOrderTotal(totalSum);
        }
    }, [order])

    function cancelOrder() {
        setOrder({ id: [], menus: [] });
        navigate("/customers");
    }

    async function confirmOrder() {
        const finishedOrder = { order: order.menus };
        try {
            const confirmationResponse = await axios.post(`${process.env.REACT_APP_API_URL}/orders/new`, { order: finishedOrder });
            navigate(`customers/order/${order.id[0]}/completed`, { orderNumber: confirmationResponse.data.orderNumber });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="confirm-order">
            <p className="section-title">Resumen de tu pedido</p>
            <span className="price-wrapper">
                <p className="total">TOTAL</p>
                <b className="total-price">€{orderTotal}</b>
            </span>
            <button className="action-button" onClick={confirmOrder}>CONFIRMAR PEDIDO</button>
            <button className="action-button" onClick={cancelOrder}>CANCELAR PEDIDO</button>
        </section>
    )
}
