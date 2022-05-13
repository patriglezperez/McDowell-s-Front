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
    uuid_menu: uuidv4(),
    time_process: 3,
  },
  {
    num: 2,
    name: "McDowell's Jr",
    price: 5.99,
    uuid_menu: uuidv4(),
    time_process: 2,
  },
];

/*the menus are collected from the back*/
function MenuPreview({ counter1, counter2, setCounter1, setCounter2 }) {
  const { order, setOrder } = useContext(StaticContext);

  //add menus
  const addMenu = (num) => {
    let burguer = menus.filter((menu) => menu.num === num);
    order[0].menus.push(...burguer);

    num === 1 ? setCounter1(counter1 + 1) : setCounter2(counter2 + 1);

    //we change the state total with the amount
    num === 1
      ? setOrder({
          ...order,
          amountMenuMcDowewlls: counter1 + 1,
        })
      : setOrder({
          ...order,
          amountMenuMcdowellsJr: counter2 + 1,
        });
  };

  //delete menus
  const deleteMenu = (num) => {
    //filtro que hamburguesas quiero borrar (de que tipo)
    let burguers = order[0].menus.filter((menu) => menu.num === num);

    console.log(burguers);
    burguers.pop();
    console.log(order, "oder");
    // setOrder(burguers);
    // burguer.num === 1 ? setCounter1(counter1 - 1) : setCounter2(counter2 - 1);
    num === 1 ? setCounter1(counter1 - 1) : setCounter2(counter2 - 1);
  };

  return (
    <div className="space-menus">
      {menus.map((menu) => (
        <div className="amount" key={menu.num}>
          <p onClick={() => deleteMenu(menu.num)}>-</p>
          <div className="menu" onClick={() => addMenu(menu.num)}>
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
          <p onClick={() => addMenu(menu.num)}>+</p>
        </div>
      ))}
    </div>
  );
}
export default MenuPreview;
