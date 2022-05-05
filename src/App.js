import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffSignIn from "./components/StaffSignIn/StaffSignIn";
import MenuPreview from "./components/menuPreview/menuPreview";
import Header from "./components/header";
import Welcome from "./components/welcome/Welcome";

import { StaticContextProvider } from "./context/staticContext";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <StaticContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/customers" element={<Welcome />} />
            {/* <StaffSignIn /> */}
            {/* <MenuPreview /> */}
          </Routes>
          <Header />
        </BrowserRouter>
      </StaticContextProvider>
    </div>

  );
}

export default App;
