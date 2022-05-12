import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/staffSignIn/StaffSignIn";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";
import { StaticContextProvider } from "./context/staticContext";
import OrderCreator from "./components/orderCreator/OrderCreator";
import OrderAmount from "./components/OrderAmount/OrderAmount";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { CounterContextProvider } from "./context/counterContext";
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
            <CounterContextProvider>
              <Route path="/customers/order/:id" element={<OrderCreator />} />
              <Route path="/test" element={<OrderAmount />} />
            </CounterContextProvider>
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
