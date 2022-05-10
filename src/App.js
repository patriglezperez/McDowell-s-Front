import { BrowserRouter, Routes, Route } from "react-router-dom";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import { StaticContextProvider } from "./context/staticContext";
import StaffSignIn from "./components/staffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/MenuPreview";
import Header from "./components/Header";
import Welcome from "./components/welcome/Welcome";
import OrderCreator from "./components/orderCreator/OrderCreator";
import PlaceOrder from "./components/placeOrder/PlaceOrder";

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/customers" element={<Welcome />} />
            <Route path="/login" element={<StaffSignIn />} />
            <Route path="/customers/order/:id" element={<OrderCreator />} />
            <Route path="customers/order/:id/completed" element={<PlaceOrder />} />
            {/* <MenuPreview /> */}
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
