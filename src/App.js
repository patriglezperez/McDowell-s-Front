import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
// import Welcome from "./components/welcome/Welcome";
import Header from "./components/header";
import OrderCreator from "./components/orderCreator/OrderCreator";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/customers" element={<Welcome />} /> */}
          <Route path="/customers/order/:id" element={<OrderCreator />} />
          {/* <StaffSignIn /> */}
          {/* <MenuPreview /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
