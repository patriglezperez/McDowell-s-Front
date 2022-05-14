import { useState, useContext, useEffect } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

function StaffList() {
  const [availability, setAvailability] = useState("");
  //no me sale el mismo numero al pasarlo desde el handleChange
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    setAvailability(event.target.value);
    console.log(availability, "availability");
  };

  return (
    <div className="staff-page">
      <div className="top-page">
        <p>Personal:</p>
        <PersonAddAlt1Icon
          onClick={() => {
            navigate(`${process.env.REACT_APP_API_URL}/admin/employees/new`);
          }}
        />
      </div>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filtrar estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={availability}
            label="availability"
            onChange={handleChange}
          >
            <MenuItem value={1}>Disponible</MenuItem>
            <MenuItem value={2}>Pausado</MenuItem>
            <MenuItem value={3}>Ocupado</MenuItem>
            <MenuItem value={4}>Ausente</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
export default StaffList;
