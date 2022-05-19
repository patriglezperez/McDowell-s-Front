import React, { useEffect, useRef, useState, createContext  } from "react";

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
    const [statusStaff, setStatusStaff] = useState(true);
    const [orders, setOrders] = useState(null); /// pedidos asignado al cocinero
    const { id } = useParams();
    const [rol, setRol] = useState("");
    const rolRef = useRef(rol);
    const statusRef = useRef(statusStaff);
    const idRef = useRef(id);
    statusRef.current = statusStaff; /// se supone q da problemas el useState dentro del useEffect
    idRef.current = id;
    rolRef.current = rol;


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

    const orderKitchen = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/kitchen`,
            {"cook": idRef.current , "status": statusRef.current})
                .then((res) => {
                    if (res.status === 200) {
                        setOrders(res.data.orders);            
                    }
            })
    }

    const orderDelivering = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/delivering`,
            {"waiter": idRef.current , "status": statusRef.current})
                .then((res) => {
                    console.log('res.status:', res.status)
                    if (res.status === 200) {
                        setOrders(res.data.orders);
                    }
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (rolRef.current === "cook") {
                orderKitchen();
            } else {
                orderDelivering();
            }
        }, 30000); //30 seg
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log('statusStaff--task:', statusStaff);
        if (statusStaff === null) {
            clearInterval();
            // actualizar estado en tablas
            console.log('statuss--absent', idRef.current);
            axios.patch(`${process.env.REACT_APP_API_URL}/staff/status`,
                {"id": idRef.current, "statuss": "absent"});
            AmplifyService.signOut();
            navigate("/");
        }
    }, [statusStaff]);

    return (<StatusStaffContext.Provider value={{ statusStaff, setStatusStaff }}>
            {rol === "cook" ? <Kitchen orders={orders} /> : <Delivering orders={orders} />}
        </StatusStaffContext.Provider>
    );
}