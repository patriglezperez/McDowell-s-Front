import { useState, useEffect } from "react";

import axios from "axios";
import OrderPreview from "../orderPreview/OrderPreview";


export default function OngoingOrders() {
    const [ongoingOrders, setOngoingOrders] = useState();

    async function getOngoingOrders() {
        try {
            const ordersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/orders/active`);
            setOngoingOrders(ordersResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setInterval(getOngoingOrders, 3000);
    }, [])


    return (
        <section className="dashboard">
            <section className="dashboard">
                <h3 className="dashboard-title">Pedidos en curso:</h3>
                {ongoingOrders && ongoingOrders.map(order => (
                   <OrderPreview data={order} />
                ))}
            </section>
        </section>
    )
}
