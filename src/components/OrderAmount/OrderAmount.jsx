import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";
import { useState, useContext } from "react";
import StaticContext from "../../context/staticContext";
import { v4 as uuidv4 } from "uuid";

const menus = [
  {
    id: 9,
    name: "McDowell's",
    price: "6,95 €",
    quantityMenu: 5,
  },
  {
    id: 8,
    name: "McDowell's Jr",
    price: "5,99 €",
    quantityMenuJr: 2,
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

  /*Remove menus*/
  //remove a menu from our account  //Menu "McDowell's"
  function removeMenu1() {
    setCounter1(counter1 - 1);
  }

  //remove a menu from our account  //Menu "McDowell's Jr",
  function removeMenu2() {
    setCounter2(counter2 - 1);
  }

  /*Add menus*/
  //add a menu of our account //Menu "McDowell's"
  function addMenu1() {
    const uuid_menu = "";

    order[0].menus.push({
      MenuMcDowells: 1,
      uuid_menu: uuidv4(),
    });

    setCounter1(counter1 + 1);
  }

  //add a menu of our account //Menu "McDowell's Jr",
  function addMenu2() {
    const uuid_menu = "";

    order[0].menus.push({
      McDowellsJr: 1,
      uuid_menu: uuidv4(),
    });
    setCounter2(counter2 + 1);
  }

  return (
    <>
      {menus.map((menu) => (
        <div className="menus" key={menu.id}>
          <div className="container">
            <img
              src={menu.name === "McDowell's" ? menuBurguer : burguer}
              alt="logoBurguer"
              className="img"
            />
            <div className="quantity">
              <button
                className="removeMenu"
                onClick={menu.name === "McDowell's" ? removeMenu1 : removeMenu2}
              >
                -
              </button>
              <p>
                {menu.quantityMenu
                  ? menu.quantityMenu + counter1
                  : menu.quantityMenuJr + counter2}
              </p>
              {/* <p>{menu.name === "McDowell's" ? counter1 : counter2}</p> */}
              <button
                className="addMenu"
                onClick={menu.name === "McDowell's" ? addMenu1 : addMenu2}
              >
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
