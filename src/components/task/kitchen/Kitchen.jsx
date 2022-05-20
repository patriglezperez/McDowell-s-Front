import React, { useState } from "react";
//, { useState, useEffect, useContext, useRef }
/* import { useNavigate } from "react-router-dom";
import AmplifyService from "../../services/amplifyService";
import axios from "axios";
import { StatusStaffContext } from "../Task"; */

import Countdown from "./countdown/Countdown";
import SelectStatus from "../selectStatus/SelectStatus";
import burguer from "../../../assets/img/logoBurguer.png";


export default function Kitchen(props) {
    console.log('puto Kitchen', props);
    const { orders } = props;
    const [timeFinish, setTimeFinish] = useState();

    if (!orders === null) {
        console.log('puto Kitchen--timeFinish', timeFinish)
        setTimeFinish(orders.order_notes.split(','))    
    } 

    /// estado del staff activo
    /* const { statusStaff } = useContext(StatusStaffContext)
    const navigate = useNavigate();
    const [orders, setOrders] = useState(""); /// pedidos asignado al cocinero
    const statusRef = useRef(statusStaff);
    const idRef = useRef(id);
    statusRef.current = statusStaff; /// se supone q da problemas el useState dentro del useEffect
    idRef.current = id; */

    /* if (statusStaff === null) {
        // actualizar estado en tablas
        console.log('Kitchen', idRef.current);
        axios.patch(`${process.env.REACT_APP_API_URL}/staff/status`,
            {"id": idRef.current, "status": "absent"});
        AmplifyService.signOut();
        navigate("/login");
    } */

    /* useEffect(() => {
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
    }, []); */

    return (<div> Cocinero 
        <SelectStatus />
        {!orders ? null : <div className="orders--kitchen">
            <div> Menu: <Countdown startingMinutes={3} /> </div>
            <div> <img src={burguer} alt="logoBurguer" className="logoBurger"/> </div>
            <div> {orders.uuid_menu} </div> 
        </div>} 
    </div>);
}