import logoBurguer from "../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import md5 from "md5-hash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AmplifyService from "./services/amplifyService";
// import { useNavigate } from "react-router-dom";

/* Verification */
const schemaUser = yup.object().shape({
  email: yup
    .string()
    .required("El nombre de usuario es necesario."),
  password: yup
    .string()
    .required("La contraseña es obligatoria.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Debe contener 5 caracteres, una mayúscula, una minúscula y un número.'),
  //Must Contain 5 characters, One Uppercase, One Lowercase and One Number
});

function StaffSignIn() {

  // const navigate = useNavigate();
  // const [md5Password, setMd5Password] = useState();
  const [isLogin, setIsLogin] = useState(false);

  //yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUser),
  });

  /*We login*/
  async function handleSignIn(userInput) {
    const response = await AmplifyService.signIn(userInput);
    console.log(response);
    if (response === AmplifyService.success) {
      console.log("Entrando en McDowell's");
      //navigate();
    } else if (response === AmplifyService.userNotFound) {
      //change alerts for a snackbar alert or something like that;
      alert('Este usuario no existe');
    } else if (response === AmplifyService.failed) {
      alert('Email o contraseña incorrectos');
    } else {
      alert('Algo salió mal. Inténtalo de nuevo más tarde');
    }
  }

  //Por desarrollar: para ver si esta logeado y que le lleve a x pantalla
  // useEffect(() => {
  //   console.log(isLogin, "Si isLogin okkk...");
  //   if (isLogin) navigate("/");
  // }, [isLogin, navigate]);

  /*We encrypt the password*/
  // async function encryptedPassword(password) {
  //   const encrypted = md5(password);
  //   setMd5Password(encrypted);
  //   return encrypted;
  // }

  /*To be able to use the enter button on the keypad*/
  const keyPressSubmit = (e) => {
    if (e.which === 13) handleSignIn();
  };

  return (
    <>
      <div className="form">
        {/* Añadir en la linea del form:  action="staff/login"
        onSubmit={handleSubmit(onSubmit) */}
        <form method="POST" onSubmit={handleSubmit(handleSignIn)}>
          <h1 className="title">McDowell's</h1>
          <br />
          <img src={logoBurguer} alt="logoBurguer" className="logoBurger" />
          <br />

          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              className="input user"
              placeholder="Email"
              {...register("email", {})}
            />
            <sub className="input-error">{errors.email && errors.email.message}</sub>
          </div>
          <br />

          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              className="input password"
              placeholder="Contraseña"
              {...register("password", {})}
            />
            <sub className="input-error">{errors.password && errors.password.message}</sub>
          </div>
          <br />
          <br />
          <div>
            <button
              type="submit"
              className="cta"
              onKeyPress={(event) => keyPressSubmit(event)}
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
