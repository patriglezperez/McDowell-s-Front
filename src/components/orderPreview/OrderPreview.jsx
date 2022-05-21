import React from "react";

export default function OrderPreview(props) {
  const status = props.data.statuss;
  const uuid = props.data.uuid_menu;
  return (
    <div className="orderpreview--wrapper">
      <div className="orderpreview--uuid">Pedido: {uuid} </div>
      <div className="orderpreview--status">
        <span className="status-green">estado:</span> {status}{" "}
      </div>
    </div>
  );
}
