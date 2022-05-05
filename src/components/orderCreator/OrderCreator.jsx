import MenuPreview from "../menuPreview/menuPreview";
import { useState, useContext, useEffect } from "react";
import takeHere from "../../assets/img/restaurant.png";
import takeAway from "../../assets/img/takeAway.png";
import axios from "axios";
/*the menus are collected from the back*/

function OrderCreator() {
  const [take, setTake] = useState(false);
  // const {order, setOrder} = useContext(staticContext)
  const [uuid_user, setUuid_user] = useState(""); //eliminar useState cuando lo deje de usar
  const [renderId, setRenderId] = useState(0);
  const [order, setOrder] = useState([]);
  const [data, setData] = useState("");

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

  function handleClick() {
    console.log("añadimos al pedido si tomar o llevar"); //Añadimos eso al contexto
    setTake(true);
    setOrder({ tomar: 0 }); //definir si tomar:1 es para tomar aqui y tomar:2 es para llevar
  }

  useEffect(() => {
    function getMenusData() {
      try {
        axios
          .get("http://localhost:3001/api/menus/all")
          .then((res) => setData(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    getMenusData();
  }, []);

  return (
    <div className="orderCreator">
      <h2 className="welcome-title">
        {take === false ? titles[0].name1 : titles[1].name1}
      </h2>
      <h1>{take === false ? titles[0].name2 : titles[1].name2}</h1>

      {take === false ? (
        <div className="space-menus">
          {typeOfRestaurant.map((restaurant) => (
            <div className="menu" key={restaurant.id}>
              <div className="card" onClick={handleClick}>
                <div className="blob"></div>
                <img
                  src={restaurant.id === 0 ? takeHere : takeAway}
                  alt="tomar o llevar"
                  className="img"
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
