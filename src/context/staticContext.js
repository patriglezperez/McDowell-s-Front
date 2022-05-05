import React, { useState } from "react";

const StaticContext = React.createContext({});

export function StaticContextProvider({ children }) {
  const [uuid_user, setUuid_user] = useState("");
  return (
    <StaticContext.Provider value={{ uuid_user, setUuid_user }}>
      {children}
    </StaticContext.Provider>
  );
}
export default StaticContext;
