import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";
import { useState } from "react";

const menus = [
  {
    name: "McDowell's",
    price: "6,95 €",
    image: menuBurguer,
    quantityMenu: 5,
  },
  {
    name: "McDowell's Jr",
    price: "5,99 €",
    image: burguer,
    quantityMenuJr: 2,
  },
];

/*the menus are collected from the back*/

function OrderAmount() {
  const [counter1, setCounter1] = useState(0); //Menu "McDowell's",
  const [counter2, setCounter2] = useState(0); //Menu "McDowell's Jr",
  console.log(counter1, "contador1 inicial");
  console.log(counter2, "contador2 inicial");

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
    setCounter1(counter1 + 1);
  }

  //add a menu of our account //Menu "McDowell's Jr",
  function addMenu2() {
    setCounter2(counter2 + 1);
  }

  return (
    <>
      {menus.map((menu) => (
        <div className="menus">
          <div className="container">
            <img src={menu.image} alt="logoBurguer" className="img" />
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

            <h2 className="nameMenu">
              Menú <br />
              {menu.name}
            </h2>
            <h3 className="priceMenu">{menu.price}</h3>
          </div>
        </div>
      ))}
    </>
  );
}
export default OrderAmount;
