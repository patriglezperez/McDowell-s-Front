import React, { useState } from "react";
import Kitchen from "./kitchen/Kitchen";


export default function Task() {
    const { urlId } = useParams();
    const [rol, setRol] = useState("");

    axios.get(`${process.env.REACT_APP_API_URL}/staff/:${urlId}`)
        .then((res) => {
            if (res.status === 200) {
                setRol(res.data.rol);            
            } else {
                setRol(res.statusText); /// revisar
            }
    });

    return (<>
        {rol === "kitchen" ? <Kitchen id={urlId} /> : <Delivering id={urlId} />}
        </>
    );
}