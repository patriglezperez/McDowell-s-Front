import logoBurguer from "../assets/img/logoBurguer.png";

function StaffSignIn() {
  async function handleLogin(e) {
    e.preventDefault();
    console.log("Entrando en McDowell's");
  }

  return (
    <div className="form">
      <form onSubmit={handleLogin}>
        <h1 className="title">McDowell's</h1>
        <br />
        <img src={logoBurguer} alt="logoBurguer" className="logoBurger" />
        <br />

        <div>
          <input
            type="text"
            name="username"
            className="input username"
            placeholder="Usuario"
          />
        </div>
        <br />

        <div>
          <input
            type="password"
            name="password"
            className="input password"
            placeholder="Contraseña"
          />
        </div>
        <br />
        <br />
        <div>
          <button type="submit" class="cta">
            <span>Entrar</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}
export default StaffSignIn;
