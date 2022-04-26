import logoBurguer from "../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import md5 from "md5-hash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

/* Verification */
/* const schemaUser = yup.object().shape({
  user: yup
    .string()
    .required("El nombre de usuario es necesario"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/),
  //Must Contain 5 characters, One Uppercase, One Lowercase, One Number and one special case Character
}); */

function StaffSignIn() {
  // const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [md5Password, setMd5Password] = useState();
  const [isLogin, setIsLogin] = useState(false);

  //yup validation
  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUser),
  });

  //Por desarrollar: Obtener los usuarioS
  //Ojo el puerto
  const onSubmit = async (data) => {
    encryptedPassword(password);
    console.log("Entrando en McDowell's");

    await axios
      .post("http://localhost:3000/api/staff/login", {
        user: data.user,
        password: data.md5Password,
      })

      .then((res) => {
        try {
          if (res.status === 200) {
            setIsLogin(true);
          }
        } catch (error) {
          console.log(errors, "Error al iniciar sesion");
        }
      });
  };
 */

  /*We login*/
  async function onSubmit(event) {
    event.preventDefault();
    setPassword("");
    setUser("");
    encryptedPassword(password);
    console.log("Entrando en McDowell's");

    return { user, md5Password };
  }

  //Por desarrollar: para ver si esta logeado y que le lleve a x pantalla
  // useEffect(() => {
  //   console.log(isLogin, "Si isLogin okkk...");
  //   if (isLogin) navigate("/");
  // }, [isLogin, navigate]);

  /*We encrypt the password*/
  async function encryptedPassword(password) {
    const encrypted = md5(password);
    setMd5Password(encrypted);
    return encrypted;
  }

  /*To be able to use the enter button on the keypad*/
  const trySubmit = (e) => {
    if (e.which === 13) onSubmit();
  };

  return (
    <>
      <div className="form">
        {/* Añadir en la linea del form:  action="staff/login"
        onSubmit={handleSubmit(onSubmit) */}
        <form method="POST" onSubmit={onSubmit}>
          <h1 className="title">McDowell's</h1>
          <br />
          <img src={logoBurguer} alt="logoBurguer" className="logoBurger" />
          <br />

          <div>
            <input
              type="text"
              name="user"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              className="input user"
              placeholder="User"
              // {...register("user", {})}
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
              // {...register("password", {})}
            />
          </div>
          <br />
          <br />
          <div>
            <button
              type="submit"
              className="cta"
              onClick={onSubmit}
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
