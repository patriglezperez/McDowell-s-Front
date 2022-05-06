import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
import Header from "./components/header";
<<<<<<< HEAD
import Welcome from "./components/welcome/Welcome";
=======
import Welcome from "./components/welcome/welcome";
>>>>>>> 63d3f2f0cf31d4306331785e67bae036e402c986
import { StaticContextProvider } from "./context/staticContext";
import OrderCreator from "./components/orderCreator/OrderCreator";

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/customers" element={<Welcome />} />
            <Route path="/customers/order/:id" element={<OrderCreator />} />
            {/* <StaffSignIn /> */}
            {/* <MenuPreview /> */}
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
