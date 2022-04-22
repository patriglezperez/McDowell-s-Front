import logoBurguer from "../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

function StaffSignIn() {
  // const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [allUsers, setAllUsers] = useState();
  // const [isLogin, setIsLogin] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setPassword("");
    setUsername("");
    // await isLogin({ username, password });
    console.log(password, "la contraseña");
    console.log(username, "el usuario");
    console.log("Entrando en McDowell's");
  }

  const trySubmit = (e) => {
    if (e.which === 13) handleLogin();
  };

  //Por desarrollar: para ver si esta logeado y que le lleve a x pantalla
  // useEffect(() => {
  //   console.log(isLogin, "Si isLogin okkk...");
  //   if (isLogin) navigate("/");
  // }, [isLogin, navigate]);

  //Por desarrollar: Obtener los usuarios
  //Ojo el puerto
  // async function getUsers () {
  //   let url = "http://localhost:3000/api/staff/all"
  //   try {
  //    let data = await axios.get(url);
  //    setAllUsers(data);
  //   } catch (error) {
  //     console.log("Error al obtener usuarios");
  //   }
  // }

  return (
    <>
      <div className="form">
        {/* Añadir en la linea del form:  action="staff/login" */}
        <form method="POST">
          <h1 className="title">McDowell's</h1>
          <br />
          <img src={logoBurguer} alt="logoBurguer" className="logoBurger" />
          <br />

          <div>
            <input
              type="text"
              name="username"
              value={username}
              onKeyPress={(e) => trySubmit(e)}
              onChange={(e) => setUsername(e.target.value)}
              className="input username"
              placeholder="Usuario"
            />
          </div>
          <br />

          <div>
            <input
              type="password"
              name="password"
              value={password}
              onKeyPress={(e) => trySubmit(e)}
              onChange={(e) => setPassword(e.target.value)}
              className="input password"
              placeholder="Contraseña"
            />
          </div>
          <br />
          <br />
          <div>
            <button type="submit" className="cta" onClick={handleLogin}>
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
    </>
  );
}
export default StaffSignIn;
