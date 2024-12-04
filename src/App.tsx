import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./providers/UserProvider";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterCompleted from "./pages/RegisterCompleted";
import ResetGuide from "./pages/ResetGuide";
import PasswordReset from "./pages/ResetPassword";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/registercomplete" element={<RegisterCompleted />} />
          <Route path="/reset" element={<ResetGuide />} />
          <Route path="/reset/password" element={<PasswordReset />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
