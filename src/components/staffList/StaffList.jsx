import { useState, useContext, useEffect } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderPreviewStaff from "../staffList/orderPreviewStaff";

function StaffList() {
  // const [availability, setAvailability] = useState("");
  const [personal, setPersonal] = useState([]);
  console.log(personal, "personal");
  const navigate = useNavigate();

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setAvailability(event.target.value);
  //   console.log(availability, "availability");
  // };

  useEffect(() => {
    const getStaff = async () => {
      try {
        axios
          .get(`${process.env.REACT_APP_API_URL}/staff/all`)
          .then((res) => setPersonal(res.data.staffAll.rows));
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, []);

  return (
    <>
      <div className="staff-page">
        <div className="top-page">
          <p>Personal:</p>
          <PersonAddAlt1Icon
            onClick={() => {
              navigate(`${process.env.REACT_APP_API_URL}/admin/employees/new`);
            }}
          />
        </div>

        {personal.map((staff) => {
          return (
            <OrderPreviewStaff
              name={staff.names}
              status={staff.statuss}
              rol={staff.rol}
            />
          );
        })}
      </div>
    </>
  );
}
export default StaffList;

// {
//   /* <Box sx={{ minWidth: 120 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Filtrar estado</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={availability}
//             label="availability"
//             onChange={handleChange}
//           >
//             <MenuItem value={1}>Disponible</MenuItem>
//             <MenuItem value={2}>Pausado</MenuItem>
//             <MenuItem value={3}>Ocupado</MenuItem>
//             <MenuItem value={4}>Ausente</MenuItem>
//           </Select>
//         </FormControl>
//       </Box> */
// }
