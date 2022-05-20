import React from "react";

export default function OrderPreview(props) {
    const { uuid, status } = props;

    return (<div>
        <div className="orderpreview--uuid"> {uuid} </div>
        <div className="orderpreview--status"> estados: {status} </div>
    </div>
    )
}