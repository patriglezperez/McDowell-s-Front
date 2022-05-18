import React, { useState, createContext  } from "react";

import AmplifyService from "../services/amplifyService";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Kitchen from "./kitchen/Kitchen";
import Delivering from "./delivering/Delivering";

const StatusStaffContext = createContext({
    statusStaff: true, // En pausa por defecto
    setStatusStaff: () => { },
  });
  
export { StatusStaffContext };

export default function Task() {
    const [statusStaff, setStatusStaff] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const [rol, setRol] = useState("");

    axios.get(`${process.env.REACT_APP_API_URL}/staff/${id}`)
        .then((res) => {
            if (res.status === 200) {
                setRol(res.data.rol);  
                console.log('res.data.rol:', res.data.rol);          
            } else {
                AmplifyService.signOut();
                navigate(`/login`);
            }
    });

    return (<StatusStaffContext.Provider value={{ statusStaff, setStatusStaff }}>
            {rol === "cook" ? <Kitchen id={id} /> : <Delivering id={id} />}
        </StatusStaffContext.Provider>
    );
}