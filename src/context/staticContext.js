import React, { useState } from "react";

const StaticContext = React.createContext({});

export function StaticContextProvider({ children }) {
  const [menus, setMenus] = useState([
    {
      uuid_user: "",
      menus: [],
    },
  ]);
  return (
    <StaticContext.Provider value={{ menus, setMenus }}>
      {children}
    </StaticContext.Provider>
  );
}
export default StaticContext;
