import { BrowserRouter, Routes, Route } from "react-router-dom";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import { StaticContextProvider } from "./context/staticContext";
import StaffSignIn from "./components/staffSignIn/StaffSignIn";
import Header from "./components/Header";
import Welcome from "./components/welcome/Welcome";
import OrderCreator from "./components/orderCreator/OrderCreator";
import PlaceOrder from "./components/placeOrder/PlaceOrder";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import OngoingOrders from "./components/ongoingOrders/OngoingOrders";


Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* customers */}
            <Route path="/customers" element={<Welcome />} />
            <Route path="/customers/order/:id" element={<OrderCreator />} />
            <Route path="customers/order/:id/completed" element={<PlaceOrder />} />
            {/* staff */}
            <Route path="/login" element={<StaffSignIn />} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders/ongoing" element={<OngoingOrders />} />
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
