import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// USER-REGISTER-LOGIN
// import { AuthProvider } from "../user-register-login/context/AuthProvider.jsx";

// EXPENSE-TRACKER
import { AuthProvider } from "../expense-tracker-client/context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
