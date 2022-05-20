import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import AmplifyService from "../services/amplifyService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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


function AdministrateStaff() {
  const [alertState, setAlertState] = useState({ open: false, message: "", severity:"" });
  const [rol, setRol] = useState("");
  const [staff, setStaff] = useState("");
  const navigate = useNavigate();

  //yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUser),
  });

  async function createStaff(data) {
    try {
      const [user, error] = await AmplifyService.signUp(data);
      if (user) {
        setAlertState({ ...alertState, open: true, message: 'Se ha agregado el nuevo empleado.', severity: 'success' });
      } else {
        setAlertState({ ...alertState, open: true, message: error.message, severity: 'error' });
      }
    } catch (error) {
      setAlertState({ ...alertState, open: true, message: error.message, severity: 'error' });
    }
  }

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
      <form onSubmit={handleSubmit(createStaff)} className="administrate-page">
        <div className="data-staff">
          <p>Nuevo empleado</p>
          <div className="group">
            <input type="email" id="user-email" name="email" className="input"  {...register("email", {})} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label for="user-email">Email</label>
          </div>
          <div className="group ">
            <input
              type="password"
              id="pass"
              name="password"
              className="input"
              minLength="5"
              required
              {...register("password", {})}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label for="pass">Contraseña</label>
          </div>
          <div className="group">
            <input required="" type="text" className="input" {...register("name", {})} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
        </div>
        <div className="bottom-page">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="availability"
                {...register("rol", {})}
              >
                <MenuItem value={'admin'}>Administrador</MenuItem>
                <MenuItem value={'cook'}>Cocinero</MenuItem>
                <MenuItem value={'waiter'}>Camarero</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="staff-btn">
            <button type="submit" >Añadir</button>
            <button
              onClick={() => {
                navigate(`/admin/employees`);
              }}
            >
              Volver
            </button>

          </div>
        </div>
      </form>
      <Snackbar open={alertState.open} autoHideDuration={3100} onClose={closeSnackbarAlert}>
        <Alert onClose={closeSnackbarAlert} severity={alertState.severity} sx={{ width: "100%", fontSize: "2rem" }}>
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default AdministrateStaff;
