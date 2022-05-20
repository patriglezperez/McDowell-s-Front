import React from "react";

export default function OrderPreviewStaff(props) {
  const { name, status, rol } = props;

  return (
    <div>
      <div className="orderpreview--uuid"> {name} </div>
      <div className="orderpreview--uuid"> {rol} </div>
      <div className="orderpreview--status"> estados: {status} </div>
    </div>
  );
}
