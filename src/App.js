import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
import OrderAmount from "./components/OrderAmount/OrderAmount";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";
import { useContext } from "react";
import { StaticContextProvider } from "./context/staticContext";

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/customers" element={<Welcome />} />
            {/* <StaffSignIn /> */}
            {/* <MenuPreview /> */}
            <Route path="/test" element={<OrderAmount />} />
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}

export default App;
