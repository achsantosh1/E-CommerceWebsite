import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const BillingContext = createContext();

const defaultAddress = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  region: "",
  country: "",
};

export const BillingProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.email;

  // Initialize billing address from localStorage
  const [billingAddress, setBillingAddress] = useState(defaultAddress);

  // Fetch billing address from localStorage when user is authenticated
  useEffect(() => {
    if (userId && isAuthenticated) {
      const savedAddress = localStorage.getItem(`billingAddress_${userId}`);
      console.log("🚀 ~ savedAddress:", savedAddress);
      if (savedAddress) {
        setBillingAddress(JSON.parse(savedAddress)); // Update billing address from localStorage
      } else {
        setBillingAddress(defaultAddress); // Default if no saved address
      }
    }
  }, [userId, isAuthenticated]);

  // Save billing address to localStorage whenever it changes
  useEffect(() => {
    if (userId && isAuthenticated && billingAddress) {
      localStorage.setItem(`billingAddress_${userId}`, JSON.stringify(billingAddress));
    }
  }, [billingAddress, userId, isAuthenticated]);

  // Clear billing address when no user is logged in
  useEffect(() => {
    if (!userId) {
      setBillingAddress(defaultAddress); // Reset billing address if the user is not logged in
    }
  }, [userId]);

  return (
    <BillingContext.Provider value={{ billingAddress, setBillingAddress }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within a BillingProvider");
  }
  return context;
};
