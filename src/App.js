import { BrowserRouter, Routes, Route } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { StaticContextProvider } from "./context/staticContext";
import StaffSignIn from "./components/staffSignIn/StaffSignIn";
import AdministrateStaff from "./components/administrateStaff/AdministrateStaff";
import Task from "./components/task/Task";
import Header from "./components/Header";
import Welcome from "./components/welcome/Welcome";
import OrderCreator from "./components/orderCreator/OrderCreator";
import PlaceOrder from "./components/placeOrder/PlaceOrder";
import StaffList from "./components/staffList/StaffList";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import OngoingOrders from "./components/ongoingOrders/OngoingOrders";
import OrderSummary from "./components/orderSummary/OrderSummary";
import OrdersHistory from "./components/orderHistory/OrderHistory";

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* customers */}
            <Route path="/" element={<Welcome />} />
            <Route path="/customers/order/:id" element={<OrderCreator />} />
            <Route
              path="customers/order/:id/completed"
              element={<PlaceOrder />}
            />
            <Route path="customers/order/:id/completed" element={<PlaceOrder />} />
            <Route
              path="/customers/order/:id/cart"
              element={<OrderSummary />}
            />
            {/* staff */}
            <Route path="/login" element={<StaffSignIn />} />
            <Route path="/staff/:id" element={<Task />} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders/ongoing" element={<OngoingOrders />} />
            <Route path="/admin/employees/new" element={<AdministrateStaff />} />
            <Route path="admin/employees" element={<StaffList />} />
            <Route path="/admin/orders/history" element={<OrdersHistory />} />
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
