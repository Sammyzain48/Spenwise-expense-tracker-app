import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Signup from "../expense-tracker-client/pages/Signup";
import Login from "../expense-tracker-client/pages/Login";
import Home from "../expense-tracker-client/pages/Home";
import Dashboard from "../expense-tracker-client/pages/Dashboard";
import Account from "../expense-tracker-client/pages/Account";
import RequireAuth from "../expense-tracker-client/hooks/ RequireAuth";
import TransactionsList from "../expense-tracker-client/pages/TransactionsList";
import Sidebar from "../expense-tracker-client/components/Sidebar";

// THIS IS FOR USER-REGISTER-LOGIN
// import Login from "../user-register-login/components/Login";
// import Signup from "../user-register-login/components/Signup";
// import Home from "../user-register-login/pages/Home";
// import Admin from "../user-register-login/pages/Admin";
// import RequireAuth from "../user-register-login/hooks/RequireAuth";
// import Layout from "../user-register-login/pages/Layout";
// import LinksPage from "../user-register-login/pages/LinksPage";

function DashboardLayout() {
  return (
    <div className="min-h-screen md:flex bg-[#0f172a]">
      <Sidebar />
      <div className="flex-1 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
}

// THIS IS FOR EXPENSE-TRACKER-CLIENT
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/transactions" element={<TransactionsList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// requiredRole={["user", "admin"]}
