import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state)  => state.user.currentUser);
  const isLoggedIn = user || localStorage.getItem("isLoggedIn");
  const location = useLocation();

  if (!isLoggedIn) {
    toast.error("Please login first!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export default ProtectedRoute;
