import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";
import { StaticContextProvider } from "./context/staticContext";
import OrderCreator from "./components/orderCreator/OrderCreator";

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/customers" element={<Welcome />} />
            <Route path="/customers/order/:id" element={<OrderCreator />} />
            {/* <StaffSignIn /> */}
            {/* <MenuPreview /> */}
          </Routes>
          <Header />
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}

export default App;
