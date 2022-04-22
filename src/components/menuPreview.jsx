import logoBurguer from "../../src/assets/img/logoBurguer.png";

function MenuPreview() {
  return (
    <div>
      <div className="menu">
        <img src={logoBurguer} alt="logoBurguer" className="burguer" />
        <p className="description">
          <b>
            Menu
            <br />
            McDowell's
          </b>
          <br />

          <span>6.95€</span>
        </p>
      </div>
    </div>
  );
}
export default MenuPreview;
