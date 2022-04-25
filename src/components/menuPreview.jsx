import burguer from "../../src/assets/img/logoBurguer.png";
import menuBurguer from "../assets/img/Menu1.png";
import React, { useState } from "react";

function MenuPreview() {
  const menuMcDowells = {
    name: "Menu McDowell's",
    price: "6.95€",
  };

  const menuJr = {
    name: "Menu McDowell's Jr",
    price: "5.99€",
  };

  const [menu1, setMenu1] = useState(menuMcDowells);
  const [menu2, setMenu2] = useState(menuJr);

  console.log(menu1, "este es el menu1");
  return (
    <>
      <div class="card">
        <div class="blob"></div>
        <img src={burguer} alt="logoBurguer" className="img" />
        <h2>
          {menu1.name}
          <br />
          <span>{menu1.price}</span>
        </h2>
        <p>
          <b>Añadir</b>
        </p>
      </div>
      <div class="card">
        <div class="blob"></div>
        <img src={menuBurguer} alt="logoBurguer" className="img" />
        <h2>
          {menu2.name}
          <br />
          <span>{menu2.price}</span>
        </h2>
        <p>
          <b>Añadir</b>
        </p>
      </div>
    </>
  );
}
export default MenuPreview;
{
  /* <div>
  <div className="menu">
    <img src={menuBurguer} alt="logoBurguer" className="burguer" />
    <p className="description">
      <b>{menu1.name}</b>
      <br />

      <span>{menu1.price}</span>
    </p>
  </div>
  <div className="menu">
    <img src={burguer} alt="logoBurguer" className="burguer" />
    <p className="description">
      <b>{menu2.name}</b>
      <br />

      <span>{menu2.price}</span>
    </p>
  </div>
</div>; */
}
