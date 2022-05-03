import burguer from "../../src/assets/img/logoBurguer.png";
import menuBurguer from "../assets/img/Menu1.png";

const menus = [
  {
    id: 1,
    name: "McDowell's",
    price: "6,95 €",
    image: menuBurguer,
  },
  {
    id: 2,
    name: "McDowell's Jr",
    price: "5,99 €",
    image: burguer,
  },
];

/*the menus are collected from the back*/

function MenuPreview() {
  return (
    <div className="space-menus">
      {menus.map((menu) => (
        <div className="menu" key={menu.id}>
          <div
            className="card"
            onClick={() => console.log(`add to cart${menu.name}`)}
          >
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
    </div>
  );
}
export default MenuPreview;
