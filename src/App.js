import { BrowserRouter, Routes, Route } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { StaticContextProvider } from "./context/staticContext";
import StaffSignIn from "./components/staffSignIn/StaffSignIn";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";
import OrderCreator from "./components/orderCreator/OrderCreator";
import PlaceOrder from "./components/placeOrder/PlaceOrder";
import OrderAmount from "./components/OrderAmount/OrderAmount";
import StaffList from "./components/staffList/StaffList";
import OrderSummary from "./components/orderSummary/OrderSummary";

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
            <Route
              path="customers/order/:id/completed"
              element={<PlaceOrder />}
            />
            <Route path="/test" element={<OrderAmount />} />
            <Route path="admin/employees" element={<StaffList />} />
            <Route
              path="/customers/order/:id/cart"
              element={<OrderSummary />}
            />
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
