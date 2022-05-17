import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AmplifyService from "../../services/amplifyService";

import { StatusStaffContext } from "../Task";

import SelectStatus from "../selectStatus/SelectStatus";
import OrderPreview from "../../orderPreview/OrderPreview";
import burguer from "../../assets/img/logoBurguer.png";


export default function Delivering(props) {
    /// estado del staff activo
    const { id } = props;
    const { statusStaff } = useContext(StatusStaffContext)
    const navigate = useNavigate();
    const [orders, setOrders] = useState(""); /// pedidos asignado al waiter
    const [finish, setFinish] = useState(false); /// pedido finalizado activar boton
    statusRef.current = statusStaff; /// se supone q da problemas el useState dentro del useEffect

    if (statusStaff === null) {
        AmplifyService.signOut();
        // actualizar estado en tablas
        await axios.patch(`${process.env.REACT_APP_API_URL}/staff/status`,
            {"id": id,"status": "absent"});
        navigate("/login");
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/orders/delivering`,
                {"waiter": id , "status": statusRef})
                .then((res) => {
                    if (res.status === 200) {
                        const order = res.data.orders;
                        // if all menus delivering finish = true
                        setFinish(order.every((e) => {e.status === "delivering"}))
                        // verificar todos los pedidos estado reparto
                        setOrders(order);
                    } else {
                        /// pedidos no encontrados
                        /// errores
                    }
            })
        }, 30000); // 30 seg
    }, []);

    function handleFinish() {
        try {
            // todos los pedidos habilitar boton
            axios.patch(`${process.env.REACT_APP_API_URL}orders/finish/${orders.orderDay}`)
            // initialize
            setOrders("");
            setFinish(false);
        } catch (err) {
            // mandar err
        }
    }

    return (<div> Reparto 
        <SelectStatus />
        {!orders ? null : <div className="orders--delivering">
            <div> Menu:  </div>
            <div> <img src={burguer} /> </div>
            <div> {orders.map((e, i) => {return (<OrderPreview uuid={e.uuid_menu} status={e.status} index={i} />)})}
            {/* /// componente para mostrar*/}
            </div> {/* /// ajustar si viene un solo menu o varios */}
            {finish ? <button onClick={handleFinish} > Finalizar </button> : null}
        </div>}
    </div>);
}