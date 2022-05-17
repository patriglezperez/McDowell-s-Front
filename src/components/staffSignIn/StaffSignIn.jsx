import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import AmplifyService from "../services/amplifyService";
import logoBurguer from "../../assets/img/logoBurguer.png";


/* Verification */
const schemaUser = yup.object().shape({
  email: yup
    .string()
    .required("El nombre de usuario es necesario."),
  password: yup
    .string()
    .required("La contraseña es obligatoria.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Debe contener 5 caracteres, una mayúscula, una minúscula y un número."),
  //Must Contain 5 characters, One Uppercase, One Lowercase and One Number
});

function StaffSignIn() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, message: "" });

  //yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUser),
  });

  /*We login*/
  const handleSignIn = async (userInput) => {
    const response = await AmplifyService.signIn(userInput);
    console.log(response);
    if (response === AmplifyService.responses.success) {
      console.log("Entrando en McDowell's");
      setIsLoggedIn(true);
    } else if (response === AmplifyService.responses.userNotFound) {
      setAlertState({ ...alertState, open: true, message: "Este usuario no existe." });
    } else if (response === AmplifyService.responses.failed) {
      setAlertState({ ...alertState, open: true, message: "Email o contraseña incorrectos." });
    } else if (response === AmplifyService.responses.userNotConfirmed) {
      setAlertState({ ...alertState, open: true, message: "Debes confirmar tu cuenta. Por favor, revisa tu correo." });
    } else {
      setAlertState({ ...alertState, open: true, message: "Algo salió mal. Inténtelo de nuevo más tarde." });
    }
  }

  const getUserId = () => {
    return localStorage.getItem("userId");
  }

  useEffect(() => {
    const userId = getUserId();
    (userId != null) ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [])

  useEffect(() => {
    const handleUserRedirection = async () => {
      if (isLoggedIn) {
        const userId = getUserId();
        try {
          console.log('fer mamon',`${process.env.REACT_APP_API_URL}/staff/login/${userId}`); ///
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/staff/login/${userId}`);
          console.log('response:',response); ///
          const adminsRole = "admin";
          console.log('rol:', response.data.rol);
          const userRole = response.data.rol;
          if (userRole === adminsRole) {
            navigate(`/admin/dashboard`);
          } else {
            navigate(`/staff/${userId}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    handleUserRedirection();
  }, [isLoggedIn, navigate]);

  const closeSnackbarAlert = (event, reason) => {
    if (reason === "clickaway") {
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
          <Alert onClose={closeSnackbarAlert} severity={"error"} sx={{ width: "100%", fontSize: "2rem" }}>
            {alertState.message}
          </Alert>
        </Snackbar>
        <br />
      </div>
    </>
  );
}

export default StaffSignIn;
