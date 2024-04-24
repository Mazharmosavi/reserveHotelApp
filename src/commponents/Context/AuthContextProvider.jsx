import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
const AuthCOntext = createContext();

const initialStates = {
  user: null,
  isAuthenicated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "Login":
      return {
        user: action.payload,
        isAuthenicated: true,
      };
    case "Logout":
      return {
        user: null,
        isAuthenicated: false,
      };
  }
}
export default function AuthCOntextProvider({ children }) {
  const FAKE_USER = {
    name: "mazhar",
    email: "user@gmail.com",
    password: "12345",
  };
  const [{ user, isAuthenicated }, dispatch] = useReducer(
    authReducer,
    initialStates
  );
  function Login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "Login", payload: FAKE_USER });
  }
  function Logout() {
    dispatch({ type: "Logout" });
  }
  return (
    <AuthCOntext.Provider value={{ user, isAuthenicated, user, Login, Logout }}>
      {children}
    </AuthCOntext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthCOntext);
}
