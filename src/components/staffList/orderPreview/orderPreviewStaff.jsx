import React from "react";

export default function OrderPreviewStaff(props) {
  const { name, status, rol } = props;

  return (
    <div className="orderpreviewstaff--wrapper">
      <div className="orderpreview--uuid"> {name} </div>

      <div className="orderpreview--status">
        <span className="status-green">Rol:</span> {rol}
      </div>

      <div className="orderpreview--status">
        <span className="status-green">Estado:</span> {status}
      </div>
    </div>
  );
}
