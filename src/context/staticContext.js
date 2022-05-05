import React, { useState } from "react";

const StaticContext = React.createContext({});

export function StaticContextProvider({ children }) {
  const [order, setOrder] = useState([
    {
      uuid_user: "",
      menus: [],
    },
  ]);
  return (
    <StaticContext.Provider value={{ order, setOrder }}>
      {children}
    </StaticContext.Provider>
  );
}
export default StaticContext;
