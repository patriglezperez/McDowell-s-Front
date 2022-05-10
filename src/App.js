import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";
import { StaticContextProvider } from "./context/staticContext";
import OrderCreator from "./components/orderCreator/OrderCreator";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
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
            {/* <MenuPreview /> */}
          </Routes>
        </BrowserRouter>
      </StaticContextProvider>
    </div>
  );
}
export default App;
