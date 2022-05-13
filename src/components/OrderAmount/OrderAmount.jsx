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
    price: 5.99,
    quantityMenuJr: 0,
  },
];

/*the menus are collected from the back*/
function OrderAmount() {
  const { order, setOrder } = useContext(StaticContext);
  const [counter1, setCounter1] = useState(order.amountMenuMcDowewlls); //Menu "McDowell's",
  const [counter2, setCounter2] = useState(order.amountMenuMcdowellsJr); //Menu "McDowell's Jr",

  console.log(order, "order");

  // //Contador
  // useEffect(() => {
  //   function create() {
  //     order[0].menus.map((menu) => {
  //       if (menu.num === 1) {
  //         setCounter1(counter1 + 1);
  //       } else if (menu.num === 2) {
  //         setCounter2(counter2 + 1);
  //       }
  //     });
  //   }
  //   create();
  // }, []);

  //Add menus
  const addMenu = (num) => {
    const burguer = menus.filter((menu) => menu.num === num);
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

  //Delete menus
  const deleteMenu = (num) => {
    // //quedan todas las hamburguesas menos la que hago el filter pero me cargo todas
    // const burguers = order.filter((menu) => menu.num !== num);
    // setOrder(burguers);
    // burguer.num === 1 ? setCounter1(counter1 - 1) : setCounter2(counter2 - 1);
    num === 1 ? setCounter1(counter1 - 1) : setCounter2(counter2 - 1);
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
            <p className="priceMenu">{menu.price}€</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default OrderAmount;
