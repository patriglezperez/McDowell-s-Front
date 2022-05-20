import { BrowserRouter, Routes, Route } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { StaticContextProvider } from "./context/staticContext";
import StaffSignIn from "./components/staffSignIn/StaffSignIn";
import Task from "./components/task/Task";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";
import OrderCreator from "./components/orderCreator/OrderCreator";
import PlaceOrder from "./components/placeOrder/PlaceOrder";
import OrderAmount from "./components/OrderAmount/OrderAmount";
import StaffList from "./components/staffList/StaffList";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import OrderSummary from "./components/orderSummary/OrderSummary";

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
            {/* staff */}
            <Route path="/login" element={<StaffSignIn />} />
            <Route path="/staff/:id" element={<Task />} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
