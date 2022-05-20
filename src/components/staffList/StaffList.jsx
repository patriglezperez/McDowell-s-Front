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
import OrderPreviewStaff from "./orderPreview/orderPreviewStaff";

function StaffList() {
  const [personal, setPersonal] = useState([]);

  const navigate = useNavigate();

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
      <div className="top-page">
        <p>Personal:</p>
        <PersonAddAlt1Icon
          onClick={() => {
            navigate(`/admin/employees/new`);
          }}
        />
      </div>
      <div className="staff-page">
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
