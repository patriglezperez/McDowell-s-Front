import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";
import { useState, useContext, useEffect } from "react";
import StaticContext from "../../context/staticContext";

/*the menus are collected from the back*/
function OrderAmount() {
  const { order, setOrder } = useContext(StaticContext);
  const [counter1, setCounter1] = useState(order.amountMenuMcDowells); //Menu "McDowell's",
  const [counter2, setCounter2] = useState(order.amountMenuMcdowellsJr); //Menu "McDowell's Jr",
  const { dataMenus, setDataMenus } = useContext(StaticContext);

  //we define the price of the menus
  const priceMenu1 = dataMenus[0].price;
  const priceMenu2 = dataMenus[1].price;

  //we do the calculations of what it is going to cost
  let orderTotal1 = priceMenu1 * order.amountMenuMcDowells;
  let orderTotal2 = priceMenu2 * order.amountMenuMcdowellsJr;

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
    };
    renderPrice();
  }, []);

  return (
    <>
      {order.amountMenuMcDowells && order.amountMenuMcdowellsJr > 0 ? (
        //if we want burguers from the both types of menus
        <>
          {dataMenus.map((menu) => (
            <div className="menus" key={menu.menu_num}>
              <div className="container">
                <img
                  src={
                    menu.menu_name === "Menu McDowells" ? menuBurguer : burguer
                  }
                  alt="logoBurguer"
                  className="img"
                />
                <div className="quantity">
                  <p>{menu.menu_num === 1 ? `${counter1}` : `${counter2}`}</p>
                </div>

                <p className="nameMenu">{menu.menu_name}</p>
                <div>
                  <p className="priceMenu">
                    {menu.menu_num === 1 ? `${orderTotal1}` : `${orderTotal2}`}€
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        //if we want only one type of menu
        <>
          <div
            className="menus"
            key={
              order.amountMenuMcDowells ? dataMenus[0].num : dataMenus[1].num
            }
          >
            <div className="container">
              <img
                src={order.amountMenuMcDowells ? menuBurguer : burguer}
                alt="logoBurguer"
                className="img"
              />
              <div className="quantity">
                <p>
                  {order.amountMenuMcDowells ? `${counter1}` : `${counter2}`}
                </p>
              </div>

              <p className="nameMenu">
                {order.amountMenuMcDowells
                  ? dataMenus[0].menu_name
                  : dataMenus[1].menu_name}
              </p>
              <p className="priceMenu">
                {order.amountMenuMcDowells
                  ? `${orderTotal1}`
                  : `${orderTotal2}`}
                €
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default OrderAmount;
