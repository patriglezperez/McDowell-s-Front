import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { Axios } from "axios";

// const baseUrl = "http://localhost:3001/api/orders/new";
// const data = await axios.post(baseUrl,{menus, id, user})

const menus = [
  {
    name: "McDowell's",
    price: "6,95 €",
    image: menuBurguer,
  },
  {
    name: "McDowell's Jr",
    price: "5,99 €",
    image: burguer,
  },
];

/*the menus are collected from the back*/

function ConfirmOrder() {
  // const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("confimado");
  }

  //Alert
  function showAlert() {
    alert("¿Estás seguro de que deseas cancelar tu pedido?");
  }

  return (
    <>
      <div className="ticketBackground">
        <form className="position">
          <h3>Resumen de tu pedido</h3>
          <div className="price">
            <p>TOTAL</p>
            <p>
              {totalPrice}
              <span> €</span>
            </p>
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="order confirm"
              onClick={handleSubmit}
            >
              Confirmar pedido
            </button>
            <br />
            <button
              className="order cancel"
              onClick={() => {
                showAlert();
                // navigate("/");
              }}
            >
              Cancelar pedido
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ConfirmOrder;
