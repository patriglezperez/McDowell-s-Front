import MenuPreview from "../../components/menuPreview/menuPreview";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import takeHere from "../../assets/img/restaurant.png";
import takeAway from "../../assets/img/takeAway.png";
import axios from "axios";
import StaticContext from "../../context/staticContext";

/*the menus are collected from the back*/

function OrderCreator() {
  const { order, setOrder } = useContext(StaticContext);
  const [view, setView] = useState(false);
  const [renderId, setRenderId] = useState(0);
  const navigate = useNavigate();
  // const { dataMenus, setDataMenus } = useContext(StaticContext);

  let locationUrl = window.location.href;

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
    const place = id;
    setRenderId(id);
    setView(true);
    const uuid_user = order[0].uuid_user;
    const createMenuView = `customers/order/${uuid_user}/create`;
    locationUrl = createMenuView;
    order[0].menus.push({ consumption: place });
  }

  //cancel the order and empty the context
  function cancelOrder() {
    setOrder({ uuid_user: [], menus: [] });
    console.log(order);
    navigate("/customers");
  }

  async function confirmOrder() {
    const uuid_user = order[0].uuid_user;
    navigate(`customers/order/${uuid_user}/cart`);
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
    <div>
      <div className="titleCreator">
        <h2 className="welcome-title">
          {view === false ? titles[0].name1 : titles[1].name1}
        </h2>
        <h1>{view === false ? titles[0].name2 : titles[1].name2}</h1>
      </div>
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

      <div className="space-buttons">
        <button class="confirmOrder" onClick={confirmOrder}>
          <span class="text">Finalizar pedido</span>
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0,4 5,9 9,0 4,5"></path>
            </svg>
          </span>
        </button>
        <button class="cancelOrder" onClick={cancelOrder}>
          <span class="text">Cancelar pedido</span>
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
export default OrderCreator;
