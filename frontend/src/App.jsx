import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Home from "./page/Home";
import { useAuthContext } from "./context/authContext";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  console.log(user);
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <Signup />}
        />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
