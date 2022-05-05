import React, { useState } from "react";

const StaticContext = React.createContext({});

export function StaticContextProvider({ children }) {
  const [order, setOrder] = useState([
    {
      uuid_user: "",
      menus: [],
    },
  ]);
  const [dataMenus, setDataMenus] = useState([]);

  return (
    <StaticContext.Provider value={{ order, setOrder }}>
      {children}
    </StaticContext.Provider>
  );
}
export default StaticContext;
