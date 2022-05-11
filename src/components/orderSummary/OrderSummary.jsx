import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaticContext from "../../context/staticContext";
import OrderAmount from "../OrderAmount/OrderAmount";

/*the menus are collected from the back*/

function OrderSummary() {
  const { order, setOrder } = useContext(StaticContext);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { dataMenus, setDataMenus } = useContext(StaticContext);

  return (
    <>
      <OrderAmount />
    </>
  );
}

export default OrderSummary;
