import React, { createContext, useContext, useState, useEffect } from "react";
import { ACTIVE_KEY, KEYS } from "../KEY/config";
import { jwtVerify } from "jose";

// create authentication context
const AuthContext = createContext();

//provide auth context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [user, setUser] = useState(null); // Store user info (e.g., user ID, email, etc.)

  //function to validate the token
  const validateToken = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("no token found in localstorage");
      setisAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      const { payload } = await jwtVerify(token, KEYS[ACTIVE_KEY]);

      //check if token is expired
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        console.log("token has expired");
        setisAuthenticated(false);
        setUser(null);
        localStorage.removeItem("authToken");
        return false;
      }

      console.log("token is valid");
      setisAuthenticated(true);
      setUser(payload);

      return true;
    } catch (err) {
      console.error("error varifying token" + err);
      setisAuthenticated(false);
      setUser(null);
      localStorage.removeItem("authToken");
      return false;
    }
  };

  //automatically validate token on app load
  useEffect(() => {
    validateToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
   

    setisAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setisAuthenticated,
        validateToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use context
export const useAuth = () => useContext(AuthContext);

//check login status in components
// const Dashboard = () => {
//     const {isAuthenticated} = useAuth();

//     return isAuthenticated ? <div>Welcome back!</div> : <div>Please log in.</div>
// }
