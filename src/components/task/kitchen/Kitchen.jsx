import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { statusStaffContext } from "../Task";

import Countdown from "./countdown/Countdown";
import SelectStatus from "../selectStatus/SelectStatus";
import burguer from "../../assets/img/logoBurguer.png";


export default function Kitchen(props) {
    const { id } = props;
    /// estado del staff activo
    const { statusStaff } = useContext(statusStaffContext)
    const navigate = useNavigate();
    const [orders, setOrders] = useState(""); /// pedidos asignado al cocinero
    statusRef.current = statusStaff; /// se supone q da problemas el useState dentro del useEffect

    if (statusStaff === null) {
        AmplifyService.signOut();
        navigate("/login");
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/orders/kitchen`,
                {"cook": id , "status": statusRef})
                .then((res) => {
                    if (res.status === 200) {
                        setOrders(res.data.orders);            
                    } else {
                        /// pedidos no encontrados
                        /// errores
                    }
            })
        }, 30000); // 30 seg
    }, []);

    return (<div> Cocinero 
        <SelectStatus />
        {!orders ? null : <div className="orders--kitchen">
            <div> Menu: <Countdown startingMinutes={orders.time} /> </div>
            <div> <img src={burguer} /> </div>
            <div> {orders.uuid} </div> 
        </div>} 
    </div>);
}