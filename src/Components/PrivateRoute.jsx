import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
  const toastMessage = () => {
    toast.error("Please login to continue");
  };
  const { currentuser } = useSelector((state) => state.user);
  if (currentuser) {
    return <Outlet />;
  } else {
    toastMessage();
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
