import { useContext, useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

function AdministrateStaff() {
  const [rol, setRol] = useState("");
  const [staff, setStaff] = useState("");
  const navigate = useNavigate();

  async function createStaff() {
    try {
      let result = await axios
        .post(`${process.env.REACT_APP_API_URL}/staff/new`, { staff })
        .then((res) => res.data);
      // console.log(result)
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setRol(event.target.value);
    console.log(rol, "rol");
  };

  return (
    <div className="administrate-page">
      <div className="data-staff">
        <p>Nuevo empleado</p>
        <div className="group">
          <input type="email" id="user-email" name="email" className="input" />
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
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label for="pass">Contraseña</label>
        </div>
        <div class="group">
          <input required="" type="text" class="input" />
          <span class="highlight"></span>
          <span class="bar"></span>
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
              value={rol}
              label="availability"
              onChange={handleChange}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Cocinero</MenuItem>
              <MenuItem value={3}>Camarero</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="staff-btn">
          <button onClick={createStaff}>Añadir</button>
          <button
            onClick={() => {
              navigate(`${process.env.REACT_APP_API_URL}/admin/employees`);
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
export default AdministrateStaff;
