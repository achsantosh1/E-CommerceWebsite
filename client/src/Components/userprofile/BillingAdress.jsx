import React, { useState, useEffect } from "react";
import { useBilling } from "../../Features/BillingContext";
import { useAuth } from "../../Features/AuthContext"; // Assuming this is your AuthContext
import './billingaddress.scss'; 

const BillingAddress = () => {
  const { user , isAuthenticated} = useAuth(); // Get user from AuthContext
  const { billingAddress, setBillingAddress } = useBilling();
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState(billingAddress);
  const [errors, setErrors] = useState({});

  // Sync `tempAddress` with `billingAddress` from context
  useEffect(() => {
    // Only set tempAddress if the billingAddress from context has changed
    if (billingAddress) {
      setTempAddress(billingAddress);
    }
  }, [billingAddress]);

  const handleEdit = () => setIsEditing(true);

  const validate = () => {
    const newErrors = {};
    if (!tempAddress.name) newErrors.name = "Name is required";
    if (!tempAddress.email) newErrors.email = "Email is required";
    if (!tempAddress.phone) newErrors.phone = "Phone is required";
    if (!tempAddress.address) newErrors.address = "Address is required";
    if (!tempAddress.city) newErrors.city = "City is required";
    if (!tempAddress.region) newErrors.region = "Region is required";
    if (!tempAddress.country) newErrors.country = "Country is required";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save the updated billing address in context and localStorage
    if(isAuthenticated){
    setBillingAddress(tempAddress); // Update context with the edited address
    setIsEditing(false);
    setErrors({});
  }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="billing-address">
      <h3>Billing Address</h3>
      {!isEditing ? (
        <div className="billing-info">
          <p><strong>Name:</strong> {billingAddress.name || "Not provided"}</p>
          <p><strong>Email:</strong> {billingAddress.email}</p>
          <p><strong>Phone:</strong> {billingAddress.phone || "Not provided"}</p>
          <p><strong>Address:</strong> {billingAddress.address || "Not provided"}</p>
          <p><strong>City:</strong> {billingAddress.city || "Not provided"}</p>
          <p><strong>Region:</strong> {billingAddress.region || "Not provided"}</p>
          <p><strong>Country:</strong> {billingAddress.country || "Not provided"}</p>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={tempAddress.name || ""}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={tempAddress.email || ""}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={tempAddress.phone || ""}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={tempAddress.address || ""}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={tempAddress.city || ""}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </label>
          <label>
            Region:
            <input
              type="text"
              name="region"
              value={tempAddress.region || ""}
              onChange={handleChange}
            />
            {errors.region && <p className="error">{errors.region}</p>}
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={tempAddress.country || ""}
              onChange={handleChange}
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </label>
          <button type="button" onClick={handleSave}>Save</button>
        </form>
      )}
    </div>
  );
};

export default BillingAddress;
