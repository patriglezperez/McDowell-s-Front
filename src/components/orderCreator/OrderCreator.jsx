import MenuPreview from "./menuPreview/menuPreview";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import takeHere from "../../assets/img/restaurant.png";
import takeAway from "../../assets/img/takeAway.png";
import axios from "axios";
import StaticContext from "../../context/staticContext";
import checkMark from "../../assets/img/checkbox_mark.png";
/*the menus are collected from the back*/

function OrderCreator() {
  const { order, setOrder } = useContext(StaticContext);
  const { dataMenus, setDataMenus } = useContext(StaticContext);

  const [view, setView] = useState(false);
  const [renderId, setRenderId] = useState(0);
  const navigate = useNavigate();

  let locationUrl = window.location.href;

  const [counter1, setCounter1] = useState(0); //Menu "McDowell's",
  const [counter2, setCounter2] = useState(0); //Menu "McDowell's Jr",
  const uuid_user = order.uuid_user[0];

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

  // choose whether to take here or take away and you go to the next view
  function choose(id) {
    const place = id;
    setRenderId(id);
    setView(true);
    const createMenuView = `customers/order/${uuid_user}/create`;
    locationUrl = createMenuView;
    setOrder({
      ...order,
      consumption: place,
    });
  }

  //cancel the order and empty the context
  function cancelOrder() {
    setOrder({ uuid_user: [], menus: [] });
    navigate("/customers");
  }

  //finalize the cart
  async function confirmOrder() {
    setOrder({
      ...order,
      amountMenuMcDowells: order.amountMenuMcDowells,
      amountMenuMcdowellsJr: order.amountMenuMcdowellsJr,
    });
    navigate(`/customers/order/${uuid_user}/cart`);
  }

  useEffect(() => {
    function getMenusData() {
      try {
        axios
          .get("http://localhost:3000/api/menu/all")
          .then((res) => setDataMenus(res.data.menuAll.rows));
      } catch (error) {
        console.log(error);
      }
    }
    getMenusData();
  }, []);

  //set the McDowells menu counter
  function changeCounter1(data1) {
    setCounter1(data1);
  }

  //set the McDowellsJr menu counter
  function changeCounter2(data2) {
    setCounter2(data2);
  }

  return (
    <div className="order-page">
      <div className="titleCreator">
        <h2 className="welcome-title">
          {/* render take or take away and when you click on it, it renders the menus.  */}

          {view === false ? titles[0].name1 : titles[1].name1}
        </h2>
        <h1>{view === false ? titles[0].name2 : titles[1].name2}</h1>
      </div>

      {/* view 1, take or take away */}
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
        // view 2, select menu type
        <MenuPreview
          counter1={counter1}
          changeCounter1={changeCounter1}
          changeCounter2={changeCounter2}
          counter2={counter2}
        />
      )}

      {/* Confirm and Cancel buttons */}

      {view === false ? (
        <div className="space-buttons">
          <button className="cancelOrder" onClick={cancelOrder}>
            <span className="text">Cancelar pedido</span>
            <span className="icon">
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
      ) : (
        <div className="space-buttons">
          <button className="confirmOrder" onClick={confirmOrder}>
            <span className="text">Finalizar pedido</span>
            <span className="icon">
              <img src={checkMark} alt="check" width="22" height="22" />
            </span>
          </button>
          <button className="cancelOrder" onClick={cancelOrder}>
            <span className="text">Cancelar pedido</span>
            <span className="icon">
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
      )}
    </div>
  );
}

export default OrderCreator;
