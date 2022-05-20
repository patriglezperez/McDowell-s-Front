import React from "react";

export default function OrderPreview(props) {
    const { uuid, status } = props.data;

    return (<div className="orderpreview--wrapper">
        <div className="orderpreview--uuid">Pedido: {uuid} </div>
        <div className="orderpreview--status"> <span className="status-green">estado:</span> {status} </div>
    </div>
    )
}