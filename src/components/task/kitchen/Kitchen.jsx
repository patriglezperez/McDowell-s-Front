import React, { useState, useEffect } from "react";
import Countdown from "./countdown/Countdown";
import burguer from "../../assets/img/logoBurguer.png";


export default function Kitchen(id) {

    const [orders, setOrders] = useState("");
    const [busy, setBusy] = useState(false);
    busyRef.current = busy; /// se supone q da problemas el useState dentro del useEffect

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/orders/kitchen`,
                {"cook": id , "status": busyRef})
                .then((res) => {
                    if (res.status === 200) {
                        setOrders(res.data.orders);            
                    } /* else {
                        setOrders(res.statusText);
                    } */
            })
        }, 30000); // 30 seg
    }, []);

    const handleBusy = () => {
        setBusy = !busy; // False/True 
    }

    return (<div> Cocinero 
        <button onSubmit={(handleBusy())} > {!busy ? "Recibir Pedidos" : "Pausa"} </button>
        {!orders ? null : <div className="orders--kitchen">
            <div> Menu: <Countdown startingMinutes={orders.time} /> </div>
            <div> <img src={burguer} /> </div>
            <div> {orders.uuid} </div>
        </div>}
    </div>);
}