import Header from "./components/header";
import StaffSignIn from "./components/StaffSignIn";
import MenuPreview from "./components/menuPreview";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <Header />
      {/* <StaffSignIn /> */}
      <MenuPreview />
    </>
  );
}

export default App;
