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
  const [orderTotal1, setOrderTotal1] = useState(0);
  const [orderTotal2, setOrderTotal2] = useState(0);

  // total price of the menus
  useEffect(() => {
    if (order.menus && order.menus.length > 0) {
      let totalSumMenu1 = 0;
      let totalSumMenu2 = 0;

      let menus1 = order.menus.filter((menu) => menu.num === 1);
      let menus2 = order.menus.filter((menu) => menu.num === 2);

      //total price of the menu 1 = Menu McDowells
      totalSumMenu1 = menus1.reduce((previousValue, currentValue) => {
        console.log(previousValue, "previousValue antes de nada");
        console.log(currentValue, "currentValue antes de nada");
        previousValue = previousValue.price;
        currentValue = order.amountMenuMcDowells;
        totalSumMenu1 = previousValue * currentValue;
        console.log(previousValue, "previousValue");
        console.log(currentValue, "currentValue");
        console.log(totalSumMenu1, "totalSumMenu1");
        return totalSumMenu1;
      });

      setOrderTotal1(totalSumMenu1);

      //total price of the menu 2 = Menu McDowells Jr
      totalSumMenu2 = menus2.reduce((previousValue2, currentValue2) => {
        previousValue2 = previousValue2.price;
        currentValue2 = order.amountMenuMcDowells;
        totalSumMenu2 = previousValue2 * currentValue2;
        return totalSumMenu2;
      });
      setOrderTotal2(totalSumMenu2);
    }
  }, [orderTotal1, orderTotal2]);

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
