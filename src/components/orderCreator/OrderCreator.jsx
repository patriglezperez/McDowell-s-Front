import MenuPreview from "../menuPreview/menuPreview";
import { useState, useContext, useEffect } from "react";
import takeHere from "../../assets/img/restaurant.png";
import takeAway from "../../assets/img/takeAway.png";
import axios from "axios";
import StaticContext from "../../context/staticContext";
import { Streetview } from "@mui/icons-material";

/*the menus are collected from the back*/

function OrderCreator() {
  const { order, setOrder } = useContext(StaticContext);
  const { dataMenus, setDataMenus } = useContext(StaticContext);
  const [view, setView] = useState(false);

  const [renderId, setRenderId] = useState(0);

  console.log(view, "view ahora");
  console.log(order, "order");

  const typeOfRestaurant = [
    {
      id: 0,
      name: "Para tomar aqui",
    },
    {
      id: 1,
      name: "Para llevar",
    },
  ];

  const titles = [
    {
      id: 1,
      name1: "Bienvenidos a McDowell's",
      name2: "¿Dónde vas a comer hoy?",
    },
    {
      id: 2,
      name1: `${
        renderId === 0 ? typeOfRestaurant[0].name : typeOfRestaurant[1].name
      }`,
      name2: "¿Qué quieres añadir a tu pedido?",
    },
  ];

  function choose(id) {
    const typerestaurant = id;
    setRenderId(id);
    console.log("clikkk");
    setView(true);
    order[0].menus.push({ consumo: typerestaurant });
  }

  // useEffect(() => {
  //   function getMenusData() {
  //     try {
  //       axios
  //         .get("http://localhost:3001/api/menus/all")
  //         .then((res) => setData(res.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getMenusData();
  // }, []);

  return (
    <div className="orderCreator">
      <h2 className="welcome-title">
        {view === false ? titles[0].name1 : titles[1].name1}
      </h2>
      <h1>{view === false ? titles[0].name2 : titles[1].name2}</h1>

      {view === false ? (
        <div className="space-menus">
          {typeOfRestaurant.map((restaurant) => (
            <div className="menu" key={restaurant.id}>
              <div className="card">
                <div className="blob"></div>
                <img
                  src={restaurant.id === 0 ? takeHere : takeAway}
                  alt="tomar o llevar"
                  className="img"
                  onClick={() => choose(restaurant.id)}
                />
                <h2 className="description">{restaurant.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MenuPreview />
      )}
    </div>
  );
}
export default OrderCreator;
