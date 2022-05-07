import burguer from "../../../assets/img/logoBurguer.png";
import menuBurguer from "../../../assets/img/Menu1.png";
import StaticContext from "../../../context/staticContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const menus = [
  {
    id: 1,
    name: "McDowell's",
    price: "6,95 €",
  },
  {
    id: 2,
    name: "McDowell's Jr",
    price: "5,99 €",
  },
];

/*the menus are collected from the back*/

function MenuPreview() {
  const { order, setOrder } = useContext(StaticContext);

  function addMenu1() {
    const uuid_menu = "";

    order[0].menus.push({
      num: 1,
      name: "McDowell's",
      price: 6.95,
      uuid_menu: uuidv4(),
      time_process: 3,
    });
    console.log(order);
  }

  function addMenu2() {
    const uuid_menu = "";

    order[0].menus.push({
      num: 2,
      name: "McDowell's Jr",
      price: 5.99,
      uuid_menu: uuidv4(),
      time_process: 2,
    });
    console.log(order);
  }

  return (
    <div className="space-menus">
      {menus.map((menu) => (
        <div className="menu" key={menu.id}>
          <div
            className="card"
            onClick={menu.name === "McDowell's" ? addMenu1 : addMenu2}
          >
            <div className="blob"></div>
            <img
              src={menu.name === "McDowell's" ? menuBurguer : burguer}
              alt="logoBurguer"
              className="img"
            />
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
