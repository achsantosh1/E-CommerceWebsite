import React, { useState, useEffect } from "react";
import "./userprofile.scss";
import { useAuth } from "../../Features/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import BillingAddress from "./BillingAdress";

const UserProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // State to track the active section
  const [activeSection, setActiveSection] = useState("dashboard");

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/notfound");
    }
  }, [isAuthenticated, navigate]); // Dependency array to trigger effect when authentication changes

  // Define content for each section
  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <p>
            Welcome to your Dashboard! <br />
            {user.username.toUpperCase()}
            <BillingAddress/>
          </p>
        );
      case "password":
        return <p>Change your password here to secure your account.</p>;
      case "orderHistory":
        return (
          <>
            <p style={{ textAlign: "center" }}>
              View your Order History or Wishlist items here.
            </p>
            <Link to="/wishlist">
              <p style={{ textAlign: "center" }}>Wishlist</p>
            </Link>
            <Link to="/orderhistory">
            <p style={{ textAlign: "center" }}>Order-History</p>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  // Don't render the component if the user is not authenticated
  if (!isAuthenticated) {
    return null; // The useEffect will redirect, so no need to render anything if not authenticated
  }
  if (!user) {
    return (
      <div
        className="loader"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Ensures full viewport height
        }}
      >
        <DotLoader />
      </div>
    );
  }
  return (
    <div className="user-profile">
      <h1>Hello, {user?.username ? user.username.toUpperCase() : "USER"}</h1>
      <p>Welcome to your dashboard!</p>
      <hr />
      <div className="profile-nav">
        <button
          className={activeSection === "dashboard" ? "active" : ""}
          onClick={() => setActiveSection("dashboard")}
        >
          My Dashboard
        </button>
        <button
          className={activeSection === "password" ? "active" : ""}
          onClick={() => setActiveSection("password")}
        >
          Password
        </button>
        <button
          className={activeSection === "orderHistory" ? "active" : ""}
          onClick={() => setActiveSection("orderHistory")}
        >
          Order History / Wishlist
        </button>
      </div>
      <div className="profile-content">{renderSectionContent()}</div>
    </div>
  );
};

export default UserProfile;
