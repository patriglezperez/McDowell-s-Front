import burguer from "../../../assets/img/logoBurguer.png";
import menuBurguer from "../../../assets/img/Menu1.png";
import StaticContext from "../../../context/staticContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

//the menus are collected from the back
function MenuPreview({ counter1, counter2, changeCounter1, changeCounter2 }) {
  const { order, setOrder } = useContext(StaticContext);
  const { dataMenus, setDataMenus } = useContext(StaticContext);

  if (order.amountMenuMcDowells >= 0) {
    counter1 = order.amountMenuMcDowells;
  }

  if (order.amountMenuMcdowellsJr >= 0) {
    counter2 = order.amountMenuMcdowellsJr;
  }

  //*
  //add menus
  const addMenu = (num) => {
    //Find the menu that we need to add
    let burguer = dataMenus.filter((menu) => menu.menu_num === num);

    //add in the menus the following information
    const serial_order = 0;
    const uuid_menu = uuidv4();
    const menu_num = burguer[0].menu_num;
    const uuid_user = order.uuid_user;
    const status = "processing";
    const chef = [];
    const waiter = [];
    const order_notes = "";
    const date_order = "";
    const consumption = order.consumption;

    order.menus.push({
      serial_order,
      uuid_menu,
      uuid_user,
      menu_num,
      status,
      chef,
      waiter,
      order_notes,
      date_order,
      consumption,
    });

    //we change the amount
    num === 1 ? changeCounter1(counter1 + 1) : changeCounter2(counter2 + 1);

    //we change the state total with the amount
    num === 1
      ? setOrder({
          ...order,
          amountMenuMcDowells: counter1 + 1,
        })
      : setOrder({
          ...order,
          amountMenuMcdowellsJr: counter2 + 1,
        });
  };
  //

  //*
  //delete menus
  const deleteMenu = (num) => {
    //we differentiate between the two types of hamburgers, we keep the ones that do not move and select the ones we have to delete
    let differents = order.menus.filter((menu) => menu.menu_num !== num);
    let burguersSelected = order.menus.filter((menu) => menu.menu_num === num);

    burguersSelected.pop();

    //empty the menu array and add the hamburgers back to it
    order.menus = [];

    differents.forEach((menu) => {
      order.menus.push(menu);
    });

    burguersSelected.forEach((menu) => {
      order.menus.push(menu);
    });

    num === 1 ? changeCounter1(counter1 - 1) : changeCounter2(counter2 - 1);

    //we change the state total with the amount
    num === 1
      ? setOrder({
          ...order,
          amountMenuMcDowells: counter1 - 1,
        })
      : setOrder({
          ...order,
          amountMenuMcdowellsJr: counter2 - 1,
        });

    //we limit the total number of hamburgers to 0 so that they are coordinated
    if (order.amountMenuMcDowells < 0) {
      setOrder({
        ...order,
        amountMenuMcDowells: 0,
      });
    }

    if (order.amountMenuMcdowellsJr < 0) {
      setOrder({
        ...order,
        amountMenuMcdowellsJr: 0,
      });
    }
  };

  //we limit the number of hamburgers to 0
  if (counter1 <= 0) {
    changeCounter1((counter1 = 0));
  }

  if (counter2 <= 0) {
    changeCounter2((counter2 = 0));
  }
  //

  return (
    <div className="space-menus">
      {dataMenus.map((menu) => (
        <div className="amount" key={menu.menu_num}>
          <RemoveCircleOutlineIcon
            onClick={() => deleteMenu(menu.menu_num)}
            size="large"
          />
          <div className="menu" onClick={() => addMenu(menu.menu_num)}>
            <div
              className="card"
              onClick={() => {
                menu.menu_num === 1
                  ? changeCounter1(counter1 + 1)
                  : changeCounter2(counter2 + 1);
              }}
            >
              <div className="blob"></div>
              <img
                src={
                  menu.menu_name === "Menu McDowells" ? menuBurguer : burguer
                }
                alt="logoBurguer"
                className="img"
              />
              <h2 className="description">
                {menu.menu_name}
                <br />
                <span>{menu.price}€</span>
              </h2>
            </div>

            <p>{menu.menu_num === 1 ? `${counter1}` : `${counter2}`}</p>
          </div>
          <AddCircleOutlineIcon
            onClick={() => addMenu(menu.menu_num)}
            size="large"
          />
        </div>
      ))}
    </div>
  );
}
export default MenuPreview;
