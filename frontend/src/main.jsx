import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { TodoContextProvider } from "./context/todoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TodoContextProvider>
          <App />
        </TodoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
