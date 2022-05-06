import burguer from "../../assets/img/logoBurguer.png";
import menuBurguer from "../../assets/img/Menu1.png";

const menus = [
  {
    id: 5,
    name: "McDowell's",
    price: "6,95 €",
    image: menuBurguer,
  },
  {
    id: 8,
    name: "McDowell's Jr",
    price: "5,99 €",
    image: burguer,
  },
];

/*the menus are collected from the back*/

function MenuPreview() {
  return (
    <>
      {menus.map((menu) => (
<<<<<<< HEAD
        <div className="menu" key={menu.name}>
=======
        <div className="menu" key={menu.id}>
>>>>>>> 63d3f2f0cf31d4306331785e67bae036e402c986
          <div className="card">
            <div className="blob"></div>
            <img src={menu.image} alt="logoBurguer" className="img" />
            <h2 className="description">
              Menu <br />
              {menu.name}
              <br />
              <span>{menu.price}</span>
            </h2>
          </div>
        </div>
      ))}
    </>
  );
}
export default MenuPreview;
