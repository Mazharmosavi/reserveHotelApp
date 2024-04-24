import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Login, isAuthenicated, user } = useAuth();

  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    if (email && password) Login(email, password);
  };
  console.log(user);

  useEffect(() => {
    if (isAuthenicated) navigate("/", { replace:false });
  }, [isAuthenicated, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={loginHandler} className="form">
        <div className="formControl">
          <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="formControl">
          <input type={"text"} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
