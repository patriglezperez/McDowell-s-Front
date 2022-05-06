import React, { useState, useEffect } from "react";

export default function Kitchen() {

    const [orders, setOrders] = useState("");
    //ordersRef.current = orders;

    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/orders/kitchen`)
                .then((res) => {
                    if (res.status === 200) {
                        setOrders(res.data.orders);            
                    } else {
                        setOrders(res.statusText);
                    }
            })
        }, 30000); // 30 seg
    }, []);

    return (<></>);
}