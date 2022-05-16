import axios from "axios";
import { useState } from "react";

export default function AdminDashboard() {
    const [ongoingOrders, setOngoingOrders] = useState();
    const [deliveredOrders, setDeliveredOrders] = useState();

    async function getOngoingOrders() {
        try {
            const ordersResponse = await axios.get(`${REACT_APP_API_URL}/orders/active`);
            setOngoingOrders(ordersResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getDeliveredOrders() {
        try {
            const ordersResponse = await axios.get(`${REACT_APP_API_URL}/orders/delivered`);
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
        <section>
            <section>
                <h3>Pedidos en curso:</h3>
                {ongoingOrders && ongoingOrders.map(order => {
                    <OrderPreview data={order} />
                })}
            </section>
            <section>
                <h3>Pedidos entregados:</h3>
                {deliveredOrders && deliveredOrders.map(order => {
                    <OrderPreview data={order} />
                })}
            </section>
        </section>
    )
}
