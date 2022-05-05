import logoBurguer from "../../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

function Welcome() {
  //   const navigate = useNavigate();
  const [uuid_user, setUuid_user] = useState("");
  console.log(uuid_user);

  /*Create a uuuid_user for the new order*/
  async function start() {
    setUuid_user(uuidv4());
    console.log("Comenzando pedido");
    // navigate("/");
  }

  return (
    <>
      <div className="start">
        <h1 className="title">McDowell's</h1>

        <img src={logoBurguer} alt="logoBurguer" className="logoBurger" />

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
