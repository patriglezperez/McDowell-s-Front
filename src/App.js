import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
import Welcome from "./components/welcome/Welcome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/customers" element={<Welcome />} />
          {/* <StaffSignIn /> */}
          {/* <MenuPreview /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
