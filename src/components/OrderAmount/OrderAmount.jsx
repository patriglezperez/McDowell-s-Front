import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";
import { useState, useContext, useEffect } from "react";
import StaticContext from "../../context/staticContext";
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
    price: "5,99 €",
    quantityMenuJr: 0,
  },
];

/*the menus are collected from the back*/

function OrderAmount() {
  const [counter1, setCounter1] = useState(0); //Menu "McDowell's",
  const [counter2, setCounter2] = useState(0); //Menu "McDowell's Jr",
  console.log(counter1, "contador1 inicial");
  console.log(counter2, "contador2 inicial");

  const { order, setOrder } = useContext(StaticContext);
  console.log(order, "order");

  //Add menus
  const addMenu = (num) => {
    const burguer = menus.filter((menu) => menu.num === num);
    setOrder([order[0].menus, ...burguer]);
    console.log(burguer);
    // burguer.num === num ? setCounter1(counter1 + 1) : setCounter2(counter2 + 1)
  };

  //Delete menus
  const deleteMenu = (num) => {
    //quedan todas las hamburguesas menos la que hago el filter pero me cargo todas
    const burguers = order.filter((menu) => menu.num !== num);
    setOrder(burguers);
  };

  return (
    <>
      {menus.map((menu) => (
        <div className="menus" key={menu.num}>
          <div className="container">
            <img
              src={menu.name === "McDowell's" ? menuBurguer : burguer}
              alt="logoBurguer"
              className="img"
            />
            <div className="quantity">
              <button
                className="removeMenu"
                onClick={() => deleteMenu(menu.num)}
              >
                -
              </button>

              <p>{menu.num === 1 ? `${counter1}` : `${counter2}`}</p>
              <button className="addMenu" onClick={() => addMenu(menu.num)}>
                +
              </button>
            </div>

            <p className="nameMenu">
              Menú <br />
              {menu.name}
            </p>
            <p className="priceMenu">{menu.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default OrderAmount;
