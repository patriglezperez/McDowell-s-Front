import React, { useState } from "react";

const StaticContext = React.createContext({});

export function StaticContextProvider({ children }) {
  const [uuid_user, setUuid_user] = useState("");
  const [menus, setMenus] = useState([]);
  return (
    <StaticContext.Provider
      value={{ uuid_user, setUuid_user, menus, setMenus }}
    >
      {children}
    </StaticContext.Provider>
  );
}
export default StaticContext;
