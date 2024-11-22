import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { SignJWT } from "jose";

const LogIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async() => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[email]; // Example: Fetching user by email

    if (user && users[email].password === password) {
      // Create JWT Token

      const secretKey = "your-secret-key"; // In production, use a better key
      const token = await new SignJWT({ email: user.email, username: user.username })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h") // Token expires in 2 hours
        .sign(new TextEncoder().encode(secretKey));

      // Store token in localStorage
      localStorage.setItem("jwtToken", token);
      
      console.log("🚀 ~ handleLogin ~ token:", token)

      // const loggedInUser = { email, username: users[email].username };
      // localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setIsLoggedIn(true);
      navigate("/"); // Redirect to home page
    } else {
      setMessage("Invalid email or password.");
    }
     
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="login-form"
      >
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <p className="signup-link">
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
};

export default LogIn;
