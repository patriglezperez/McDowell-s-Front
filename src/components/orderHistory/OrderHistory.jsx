import { useState, useEffect } from "react";

import axios from "axios";
import OrderPreview from "../orderPreview/OrderPreview";

export default function OrdersHistory() {
  const [orderHistory, setOrderHistory] = useState();

  async function getOrdersHistory() {
    try {
      const ordersResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/track/history`
      );
      setOrderHistory(ordersResponse.data.historyOrders.rows);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setInterval(getOrdersHistory, 3000);
  }, []);

  return (
    <section className="dashboard">
      <section className="dashboard">
        <h3 className="dashboard-title">Historial de pedidos:</h3>
        {orderHistory &&
          orderHistory.map((order) => <OrderPreview data={order} />)}
      </section>
    </section>
  );
}
