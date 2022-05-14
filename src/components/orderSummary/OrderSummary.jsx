import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaticContext from "../../context/staticContext";
import OrderAmount from "../OrderAmount/OrderAmount";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

/*the menus are collected from the back*/

function OrderSummary() {
  const { order, setOrder } = useContext(StaticContext);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { dataMenus, setDataMenus } = useContext(StaticContext);

  let id = order.uuid_user;

  function backToMenus() {
    navigate(`/customers/order/${id}`);
  }

  return (
    <>
      <ArrowBackIosIcon sx={{ fontSize: "1.4rem" }} onClick={backToMenus} />
      <OrderAmount />
    </>
  );
}

export default OrderSummary;
