import React, { useState } from "react";

export const StaticContext = React.createContext({});

export default function StaticContextProvider({ children }) {
  const [uuid_user, setUuid_user] = useState("12345");

  <StaticContext.Provider value={(uuid_user, setUuid_user)}>
    {children}
  </StaticContext.Provider>;
}
