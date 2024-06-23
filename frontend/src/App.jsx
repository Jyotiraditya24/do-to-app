import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import { useEffect, useState } from "react";
import Signup from "./page/Signup";
import Home from "./page/Home";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            currentUser ? (
              <Home currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
