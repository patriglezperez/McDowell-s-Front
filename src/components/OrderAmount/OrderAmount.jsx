import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";

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

/*the menus are collected from the back*/

function OrderAmount() {
  return (
    <>
      Estamos en order amount
      {menus.map((menu) => (
        <div className="menus">
          <div className="container">
            <img src={menu.image} alt="logoBurguer" className="img" />
            <div className="quantity">
              <input type="button" value="--" />
              <p>x1</p>
              <input type="button" value="+" />
            </div>

            <h2 className="nameMenu">
              Menu <br />
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
