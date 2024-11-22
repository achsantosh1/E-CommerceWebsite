import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.scss"; 

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
      setMessage("User already exists!");
    } else {
      users[email] = { username, password };
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("Signup successful! Redirecting to Login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="signup-form"
      >
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
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
        <button type="submit" className="signup-btn">
          Signup
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
