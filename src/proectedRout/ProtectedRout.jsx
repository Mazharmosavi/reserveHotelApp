import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../commponents/Context/AuthContextProvider";

function ProtectedRout({ children }) {
  const { isAuthenicated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenicated) navigate("/Login");
  }, [isAuthenicated, navigate]);
  return isAuthenicated ? children : null;
}

export default ProtectedRout;
