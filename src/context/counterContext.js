import React, { useState } from "react";

const CounterContext = React.createContext({});

export function CounterContextProvider({ children }) {
  const [numberMcDowells, setNumberMcDowells] = useState(0);
  const [numberMcDowellsJr, setNumberMcDowellsJr] = useState(0);

  return (
    <CounterContextProvider.Provider
      value={{
        numberMcDowells,
        setNumberMcDowells,
        numberMcDowellsJr,
        setNumberMcDowellsJr,
      }}
    >
      {children}
    </CounterContextProvider.Provider>
  );
}
export default CounterContext;
