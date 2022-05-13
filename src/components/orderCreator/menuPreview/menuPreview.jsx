import burguer from "../../../assets/img/logoBurguer.png";
import menuBurguer from "../../../assets/img/Menu1.png";
import StaticContext from "../../../context/staticContext";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const menus = [
  {
    num: 1,
    name: "McDowell's",
    price: 6.95,
  },
  {
    num: 2,
    name: "McDowell's Jr",
    price: 5.99,
  },
];

/*the menus are collected from the back*/
function MenuPreview({ counter1, counter2, setCounter1, setCounter2 }) {
  const { order, setOrder } = useContext(StaticContext);

  //Add menu "McDowell's" to the context
  function addMenu1() {
    const uuid_menu = "";
    order[0].menus.push({
      num: 1,
      name: "McDowell's",
      price: 6.95,
      uuid_menu: uuidv4(),
      time_process: 3,
    });
  }

  //Add menu "McDowell's Jr " to the context
  function addMenu2() {
    const uuid_menu = "";
    order[0].menus.push({
      num: 2,
      name: "McDowell's Jr",
      price: 5.99,
      uuid_menu: uuidv4(),
      time_process: 2,
    });
  }

  return (
    <div className="space-menus">
      {menus.map((menu) => (
        <div
          className="menu"
          key={menu.num}
          onClick={menu.name === "McDowell's" ? addMenu1 : addMenu2}
        >
          <div
            className="card"
            onClick={() => {
              menu.num === 1
                ? setCounter1(counter1 + 1)
                : setCounter2(counter2 + 1);
            }}
          >
            <div className="blob"></div>
            <img
              src={menu.name === "McDowell's" ? menuBurguer : burguer}
              alt="logoBurguer"
              className="img"
            />
            <h2 className="description">
              Menu <br />
              {menu.name}
              <br />
              <span>{menu.price}€</span>
            </h2>
          </div>
          <p>{menu.num === 1 ? `${counter1}` : `${counter2}`}</p>
        </div>
      ))}
    </div>
  );
}
export default MenuPreview;
