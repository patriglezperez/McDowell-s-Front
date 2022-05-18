import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaticContext from "../../context/staticContext";
import OrderAmount from "../OrderAmount/OrderAmount";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ConfirmOrder from "../../components/confirmOrder/confirmOrder";

/*the menus are collected from the back*/

function OrderSummary() {
  const { order, setOrder } = useContext(StaticContext);
  const navigate = useNavigate();
  let id = order.uuid_user;
  console.log(order);

  //go back
  function backToMenus() {
    navigate(`/customers/order/${id}`);
  }

  return (
    <>
      <ArrowBackIosIcon sx={{ fontSize: "1.4rem" }} onClick={backToMenus} />
      <OrderAmount />
      <ConfirmOrder />
    </>
  );
}

export default OrderSummary;
