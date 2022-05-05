import MenuPreview from "../menuPreview/menuPreview";
/*the menus are collected from the back*/

function OrderCreator() {
  return (
    <div className="orderCreator">
      <h1>Bienvenidos a McDowell's</h1>
      <h2>¿Dónde vas a comer hoy?</h2>
      <MenuPreview />
    </div>
  );
}
export default OrderCreator;
