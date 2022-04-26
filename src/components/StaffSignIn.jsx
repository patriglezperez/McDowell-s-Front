import logoBurguer from "../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
import md5 from "md5-hash";

// import { useNavigate } from "react-router-dom";
// import axios from "axios";

function StaffSignIn() {
  // const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [md5Password, setMd5Password] = useState();
  // const [allUsers, setAllUsers] = useState();
  // const [isLogin, setIsLogin] = useState("");

  /*We login*/
  async function handleLogin(event) {
    event.preventDefault();
    setPassword("");
    setUserEmail("");
    encryptedPassword(password);
    console.log("Entrando en McDowell's");
    return { userEmail, md5Password };
  }

  /*We encrypt the password*/
  async function encryptedPassword(password) {
    const encrypted = md5(password);
    setMd5Password(encrypted);
    return encrypted;
  }

  /*To be able to use the enter button on the keypad*/
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
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              className="input password"
              placeholder="Contraseña"
            />
          </div>
          <br />
          <br />
          <div>
            <button
              type="submit"
              className="cta"
              onClick={handleLogin}
              onKeyPress={(event) => trySubmit(event)}
            >
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
