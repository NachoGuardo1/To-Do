import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutesLogin = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario !== null) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};
