import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./providers/UserProvider";
import Main from "./pages/Main";

function App() {
  console.log(process.env.REACT_APP_API_HOST);

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
