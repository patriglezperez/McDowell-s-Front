import React, { useState } from "react";

const StaticContext = React.createContext({});

export function StaticContextProvider({ children }) {
  const [order, setOrder] = useState([
    {
      uuid_user: 0,
      menus: [],
    },
  ]);
  const [dataMenus, setDataMenus] = useState([]);

  return (
    <StaticContext.Provider
      value={{ order, setOrder, dataMenus, setDataMenus }}
    >
      {children}
    </StaticContext.Provider>
  );
}
export default StaticContext;
