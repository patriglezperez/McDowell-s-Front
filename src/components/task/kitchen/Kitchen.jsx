import React, { useState, useEffect } from "react";
import Countdown from "./countdown/Countdown";
import SelectStatus from "./selectStatus/SelectStatus";
import burguer from "../../assets/img/logoBurguer.png";


export default function Kitchen(id) {

    const [orders, setOrders] = useState("");
    /* const [busy, setBusy] = useState(false); */
    const [status, setStatus] = useState(true);
    statusRef.current = status; /// se supone q da problemas el useState dentro del useEffect

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/orders/kitchen`,
                {"cook": id , "status": statusRef})
                .then((res) => {
                    if (res.status === 200) {
                        setOrders(res.data.orders);            
                    } /* else {
                        setOrders(res.statusText);
                    } */
            })
        }, 30000); // 30 seg
    }, []);

    /* const handleBusy = () => {
        setBusy = !busy; // False/True 
    } */

    const handleChange = (event) => {
        if (event.target.value === null) {
            /// logout
        } else {
            setStatus(event.target.value);
        }
    };

    return (<div> Cocinero 
        {/* <button onSubmit={(handleBusy())} > {!busy ? "Recibir Pedidos" : "Pausa"} </button> */}
        <SelectStatus handleChange={handleChange} />
        {!orders ? null : <div className="orders--kitchen">
            <div> Menu: <Countdown startingMinutes={orders.time} /> </div>
            <div> <img src={burguer} /> </div>
            <div> {orders.uuid} </div>
        </div>}
    </div>);
}