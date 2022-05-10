import React, { useState, createContext  } from "react";

import AmplifyService from "../../services/amplifyService";

import Kitchen from "./kitchen/Kitchen";

const statusStaffContext = createContext({
    statusStaff: [],
    setStatusStaff: () => { },
  });
  
export { statusStaffContext };

export default function Task() {
    const { urlId } = useParams();
    const [rol, setRol] = useState("");

    axios.get(`${process.env.REACT_APP_API_URL}/staff/:${urlId}`)
        .then((res) => {
            if (res.status === 200) {
                setRol(res.data.rol);            
            } else {
                AmplifyService.signOut();
                navigate(`/login`);
            }
    });

    return (<petsContext.Provider>
            {rol === "kitchen" ? <Kitchen id={urlId} /> : <Delivering id={urlId} />}
        </petsContext.Provider>
    );
}