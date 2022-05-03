import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";
import { useState } from "react";

/*the menus are collected from the back*/

function ConfirmOrder() {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "McDowell's",
      price: "6,95 €",
      image: menuBurguer,
    },
    {
      id: 2,
      name: "McDowell's Jr",
      price: "5,99 €",
      image: burguer,
    },
  ]);

  return (
    <>
      <div className="ticketBackground">
        <div className="position">
          <h3>Resumen de tu pedido</h3>
          <div className="price">
            <p>TOTAL</p>
            <p>
              18
              <span> €</span>
            </p>
          </div>
          <div className="btn-container">
            <button className="order confirm">Confirmar pedido</button>
            <br />
            <button className="order cancel">Cancelar pedido</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmOrder;
