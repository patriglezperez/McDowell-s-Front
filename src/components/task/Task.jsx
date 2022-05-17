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
    const navigate = useNavigate();
    const { urlId } = useParams();
    const [rol, setRol] = useState("");

    axios.get(`${process.env.REACT_APP_API_URL}/staff/:${urlId}`)
        .then((res) => {
            if (res.status === 200) {
                setRol(res.data.rol);            
            } else {
                AmplifyService.signOut();
                navigate(`/login`);
            }
    });

    return (<StatusStaffContext.Provider>
            {rol === "kitchen" ? <Kitchen id={urlId} /> : <Delivering id={urlId} />}
        </StatusStaffContext.Provider>
    );
}