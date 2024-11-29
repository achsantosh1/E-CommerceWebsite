import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { SignJWT } from "jose";
import { KEYS, ACTIVE_KEY } from "../../KEY/config";
import { useAuth } from "../../Features/AuthContext"; // Import useAuth hook
import { useWishlist } from "../../Features/WishlistContext"; 

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { validateToken } = useAuth(); // Access context methods
  const {getUserIdFromToken}= useWishlist();

  const handleLogin = async () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[email]; // Example: Fetching user by email

    if (user && users[email].password === password) {
      try {
        // Create JWT Token
        const token = await new SignJWT({
          email: user.email,
          username: user.username,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("2h") // Token expires in 2 hours
          .sign(KEYS[ACTIVE_KEY]); // Use the active key dynamically

        // Store token in localStorage
        localStorage.setItem("authToken", token);
        console.log("🚀 ~ handleLogin ~ token:", token);

        getUserIdFromToken();


        // Validate token and navigate to home
        const isValid = await validateToken();
        if (isValid) {
          navigate("/"); // Redirect to home page
        }
      } catch (error) {
        console.error("Token generation error:", error);
        setMessage("An error occurred. Please try again.");
      }
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
