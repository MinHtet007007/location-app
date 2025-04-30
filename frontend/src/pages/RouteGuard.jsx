import React from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default RouteGuard;
