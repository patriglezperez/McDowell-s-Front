import logoBurguer from "../../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import { useContext } from "react";
import StaticContext from "../../context/staticContext";

function Welcome() {
  const navigate = useNavigate();
  const { order, setOrder } = useContext(StaticContext);

  //Create a uuuid_user for the new order
  async function start() {
    const id = uuidv4();
    order.uuid_user.push(id);
    navigate(`order/${id}`);
  }

  return (
    <>
      <div className="start">
        <h1 className="title">McDowell's</h1>
        <br />
        <img src={logoBurguer} alt="logoBurguer" className="logoBurger" />
        <br />
        <div>
          <button type="submit" className="cta" onClick={start}>
            <span>Comenzar pedido</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
export default Welcome;
