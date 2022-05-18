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
    uuid_menu: uuidv4(),
    time_process: 2,
  },
];

/*the menus are collected from the back*/
function OrderAmount() {
  const { order, setOrder } = useContext(StaticContext);
  const [counter1, setCounter1] = useState(order.amountMenuMcDowells); //Menu "McDowell's",
  const [counter2, setCounter2] = useState(order.amountMenuMcdowellsJr); //Menu "McDowell's Jr",

  //we define the price of the menus
  const priceMenu1 = menus[0].price;
  const priceMenu2 = menus[1].price;

  //we do the calculations of what it is going to cost
  let orderTotal1 = priceMenu1 * order.amountMenuMcDowells;
  let orderTotal2 = priceMenu2 * order.amountMenuMcdowellsJr;

  console.log(" order.amountMenuMcDowells;", order.amountMenuMcDowells);
  console.log(" order.amountMenuMcdowellsJr;", order.amountMenuMcdowellsJr);

  useEffect(() => {
    //if the total of MenuMcDowells is greater than 0 then it rises to context
    const renderPrice = () => {
      if ((orderTotal1 > 0) | (orderTotal2 > 0)) {
        setOrder({
          ...order,
          totalPriceMcDowells: orderTotal1,
          totalPriceMcdowellsJr: orderTotal2,
        });
      }
      //if the total of MenuMcdowellsJr is greater than 0 then it rises to context
    };
    renderPrice();
  }, []);

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
              <p>{menu.num === 1 ? `${counter1}` : `${counter2}`}</p>
            </div>

            <p className="nameMenu">
              Menú <br />
              {menu.name}
            </p>
            <p className="priceMenu">
              {menu.num === 1 ? `${orderTotal1}` : `${orderTotal2}`}€
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
export default OrderAmount;
