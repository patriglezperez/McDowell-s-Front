import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import StaticContext from "../../context/staticContext";

export default function ConfirmOrder() {
  const { order, setOrder } = useContext(StaticContext);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  //if there is the total price of one or the other, then it adds up to
  useEffect(() => {
    if (
      order.menus &&
      order.totalPriceMcDowells &&
      order.totalPriceMcdowellsJr
    ) {
      let totalSum = 0;

      totalSum = order.totalPriceMcDowells + order.totalPriceMcdowellsJr;
      totalSum = totalSum.toFixed(2);
      setOrderTotal(totalSum);
    } else if (
      (order.menus && order.totalPriceMcDowells) ||
      order.totalPriceMcdowellsJr
    ) {
      let totalSum = order.totalPriceMcDowells || order.totalPriceMcdowellsJr;

      setOrderTotal(totalSum);
    }
  }, [order]);

  //cancel the order and delete everything
  function cancelOrder() {
    setOrder({ uuid_user: [], menus: [] });
    navigate("/");
  }

  //confirm order and place the POST
  async function confirmOrder() {
    //const finishedOrder = { order: order.menus };

    try {
      const confirmationResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/new`,
        { order: order.menus }
      );
      setOrder({ ...order, orderNumber: confirmationResponse.data.orders[0].order_day, orderTotal: orderTotal });
      navigate(`/customers/order/${order.uuid_user}/completed`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="confirm-order">
      <p className="section-title">Resumen de tu pedido</p>
      <span className="price-wrapper">
        <p className="total">TOTAL</p>
        <b className="total-price">{orderTotal}€</b>
      </span>
      <button className="action-button" onClick={confirmOrder}>
        CONFIRMAR PEDIDO
      </button>
      <button className="action-button" onClick={cancelOrder}>
        CANCELAR PEDIDO
      </button>
    </section>
  );
}
