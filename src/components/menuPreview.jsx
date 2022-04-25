import burguer from "../../src/assets/img/logoBurguer.png";
import menuBurguer from "../assets/img/Menu1.png";
import React, { useState } from "react";

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
function MenuPreview() {
  return (
    <>
      {menus.map((menu) => (
        <div className="menu">
          <div className="card">
            <div className="blob"></div>
            <img src={menu.image} alt="logoBurguer" className="img" />
            <h2 className="description">
              Menu <br />
              {menu.name}
              <br />
              <span>{menu.price}</span>
            </h2>
          </div>
        </div>
      ))}
    </>
  );
}
export default MenuPreview;

/*<div class="card">
        <div class="blob"></div>
        <img src={menu1.image.burguer} alt="logoBurguer" className="img" />
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
        <img src={menu2.image.menuBurguer} alt="logoBurguer" className="img" />
        <h2>
          {menu2.name}
          <br />
          <span>{menu2.price}</span>
        </h2>
        <p>
          <b>Añadir</b>
        </p>
      </div>
*/
