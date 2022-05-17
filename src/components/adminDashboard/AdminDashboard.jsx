import { useState, useEffect } from "react";

import axios from "axios";
import OrderPreview from "../orderPreview/OrderPreview";


export default function AdminDashboard() {
    const [ongoingOrders, setOngoingOrders] = useState();
    const [deliveredOrders, setDeliveredOrders] = useState();

    async function getOngoingOrders() {
        try {
            const ordersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/orders/active`);
            setOngoingOrders(ordersResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getDeliveredOrders() {
        try {
            const ordersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/orders/delivered`);
            setDeliveredOrders(ordersResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setInterval(getOngoingOrders, 3000);
        setInterval(getDeliveredOrders, 3000);
    }, [])


    return (
        <section className="dashboard">
            <section className="dashboard">
                <h3 className="dashboard-title">Pedidos en curso:</h3>
                {ongoingOrders && ongoingOrders.map(order => (
                   <OrderPreview data={order} />
                ))}
            </section>
            <section className="dashboard">
                <h3 className="dashboard-title">Pedidos entregados:</h3>
                {deliveredOrders && deliveredOrders.map(order => (
                    <OrderPreview data={order} />
                ))}
            </section>
        </section>
    )
}
