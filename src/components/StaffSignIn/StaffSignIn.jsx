import logoBurguer from "../../assets/img/logoBurguer.png";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AmplifyService from "./services/amplifyService";
import logoBurguer from "../assets/img/logoBurguer.png";


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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, message: '', severity: '' });

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
    if (response === AmplifyService.responses.success) {
      console.log("Entrando en McDowell's");
      //navigate();
    } else if (response === AmplifyService.responses.userNotFound) {
      //change alerts for a snackbar alert or something like that;
      setAlertState({ ...alertState, open: true, severity: 'error', message: 'Este usuario no existe.' });
    } else if (response === AmplifyService.responses.failed) {
      setAlertState({ ...alertState, open: true, severity: 'error', message: 'Email o contraseña incorrectos.' });
    } else {
      setAlertState({ ...alertState, open: true, severity: 'error', message: 'Algo salió mal. Inténtelo de nuevo más tarde.' });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    (token != null) ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [])

  //Por desarrollar: para ver si esta logeado y que le lleve a x pantalla
  // es necesario ver el rol del empleado
  // useEffect(() => {
  //   console.log(isLogin, "Si isLogin okkk...");
  //   if (isLogin) navigate("/");
  // }, [isLogin, navigate]);

  /*To be able to use the enter button on the keypad*/
  const keyPressSubmit = (e) => {
    if (e.which === 13) handleSignIn();
  };

  const closeSnackbarAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState({ ...alertState, open: false });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <div className="form">
        <form method="POST" action="staff/login" onSubmit={handleSubmit(handleSignIn)}>
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
        <Snackbar open={alertState.open} autoHideDuration={6000} onClose={closeSnackbarAlert}>
          <Alert onClose={closeSnackbarAlert} severity={alertState.severity} sx={{ width: '100%', fontSize: '2rem' }}>
            {alertState.message}
          </Alert>
        </Snackbar>
        <br />
      </div>
    </>
  );
}
export default StaffSignIn;
