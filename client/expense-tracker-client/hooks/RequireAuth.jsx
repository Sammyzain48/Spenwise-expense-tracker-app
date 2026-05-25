import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RequireAuth = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  return auth?.accessToken && auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
