import MenuPreview from "../menuPreview/menuPreview";
import { useState, useContext } from "react";
// import StaticContext from
import takeHere from "../../assets/img/restaurant.png";
import takeAway from "../../assets/img/takeAway.png";

/*the menus are collected from the back*/

function OrderCreator() {
  const [take, setTake] = useState(false);
  // const {uuid_user, setUuid_user} = useContext(staticContext)
  // const {menus, setMenus} = useContext(staticContext)
  const [uuid_user, setUuid_user] = useState(""); //quitar useState cuando lo deje de usar
  const [menus, setMenus] = useState([]);

  console.log(uuid_user, "uuid");
  console.log(menus, "menus");

  const typeOfRestaurant = [
    {
      id: 1,
      name: "Para tomar aqui",
    },
    {
      id: 2,
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
      name1: "Por probar",
      name2: "¿Que quieres añadir a tu pedido?",
    },
  ];

  function handleClick() {
    console.log("añadimos al pedido si tomar o llevar"); //Añadimos eso al contexto
    setTake(true);
    setMenus({ tomar: 1 }); //definir si tomar:1 es para tomar aqui y tomar:2 es para llevar
  }

  // useEffect(() => {
  //   console.log("añadimos al pedido");

  //   function handleClick() {
  //     try {
  //       setTake(true);
  //       axios
  //         .get("http://localhost:3001/api/menus/all")
  //         .then((res) => setData(res.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, []);
  return (
    <div className="orderCreator">
      <h2 className="welcome-title">
        {uuid_user.length === 0 ? titles[0].name1 : titles[1].name1}
      </h2>
      <h1>{uuid_user.length === 0 ? titles[0].name2 : titles[1].name2}</h1>

      {take === false ? (
        <div className="space-menus">
          {typeOfRestaurant.map((restaurant) => (
            <div className="menu" key={restaurant.id}>
              <div className="card" onClick={handleClick}>
                <div className="blob"></div>
                <img
                  src={restaurant.id === 1 ? takeHere : takeAway}
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
