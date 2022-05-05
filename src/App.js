import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
import Welcome from "./components/welcome/Welcome";
import Header from "./components/header";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
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
