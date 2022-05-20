import React, { useState, useEffect, useRef } from "react";
// , useEffect, useContext, useRef
/* import { useNavigate } from "react-router-dom";
import AmplifyService from "../../services/amplifyService"; */
import axios from "axios";
/* import { StatusStaffContext } from "../Task"; */

import SelectStatus from "../selectStatus/SelectStatus";
import OrderPreview from "../../orderPreview/OrderPreview";
import burguer from "../../../assets/img/logoBurguer.png";


export default function Delivering(props) {
    /// estado del staff activo
    console.log('puto Delivering');
    const { orders } = props;
    /* const { statusStaff } = useContext(StatusStaffContext) */
    /* const navigate = useNavigate(); */
    /* const [orders, setOrders] = useState(""); /// pedidos asignado al waiter */

    const [finish, setFinish] = useState(false); /// pedido finalizado activar boton
    /* const finishRef = useRef(finish);
    finishRef.current = finish; */
    /* const statusRef = useRef(statusStaff);
    const idRef = useRef(id);
    statusRef.current = statusStaff; /// se supone q da problemas el useState dentro del useEffect
    idRef.current = id; */

    useEffect(() => {
        
        if (orders) {
            console.log("orders--finish:", orders)
            const kaka = orders.every((e) => {return e.statuss === "delivering"})
            console.log("kaka:",kaka)
            setFinish(kaka)
        }
    }, [orders]);

    /* if (statusStaff === null) {
        /// actualizar estado en tablas
        console.log('Delivering', idRef.current);
        axios.patch(`${process.env.REACT_APP_API_URL}/staff/status`,
            {"id": idRef.current, "status": "absent"});
        AmplifyService.signOut();
        navigate("/login");
    } */

    /* useEffect(() => {
        const timer = setTimeout(() => {
            console.log('props-delivering:', idRef, statusRef);
            axios.get(`${process.env.REACT_APP_API_URL}/orders/delivering`,
                {"waiter": idRef , "status": statusRef})
                .then((res) => {
                    console.log('res.status:', res.status)
                    if (res.status === 200) {
                        const order = res.data.orders;
                        // if all menus delivering finish = true
                        setFinish(order.every((e) => {return e.status === "delivering"}))
                        // verificar todos los pedidos estado reparto
                        setOrders(order);
                    } else {
                        /// pedidos no encontrados
                        /// errores
                        console.log('res.status:', res.status)
                    }
                })
                /// tengo q ignorar el 404 
        }, 30000); // 30 seg
    }, []); */

    async function handleFinish() {
        try {
            // todos los pedidos habilitar boton
            await axios.patch(`${process.env.REACT_APP_API_URL}orders/finish/${orders.orderDay}`)
            // initialize
            orders = null;
            setFinish(false);
        } catch (err) {
            // mandar err
        }
    }

    return (<div> Reparto 
        <SelectStatus />
        {!orders ? null : <div className="orders--delivering">
            <div> Menu:  </div>
            <div> <img src={burguer} alt="logoBurguer" className="logoBurger"/> </div>
            <div> {orders.map((e, i) => {return (<OrderPreview uuid={e.uuid_menu} status={e.statuss} index={i} />)})}
            {/* /// componente para mostrar*/}
            </div> {/* /// ajustar si viene un solo menu o varios */}
            {finish ? <button onClick={handleFinish} > Finalizar </button> : null}
        </div>}
    </div>);
}