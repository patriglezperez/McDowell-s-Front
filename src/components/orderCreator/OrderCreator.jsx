import MenuPreview from "../menuPreview/menuPreview";
/*the menus are collected from the back*/

function OrderCreator() {
  return (
    <div className="orderCreator">
      <h2 className="welcome-title">Bienvenidos a McDowell's</h2>
      <h1>¿Dónde vas a comer hoy?</h1>

      <MenuPreview />
    </div>
  );
}
export default OrderCreator;
