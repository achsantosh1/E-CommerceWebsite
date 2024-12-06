import React, { useContext, useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { CartContext } from "../../Features/ContextProvider";
import { useAuth } from "../../Features/AuthContext";
import "./checkout.scss";
import { useBilling } from "../../Features/BillingContext";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cart, dispatch } = useContext(CartContext);
  //   console.log("🚀 ~ CheckOut ~ cart:", cart);
  const { billingAddress } = useBilling();
  // console.log("🚀 ~ CheckOut ~ billingAddress:", billingAddress)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

  const [isSameAddress, setIsSameAddress] = useState(false);

  // Initialize orderData in localStorage as an array
  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem("orderData"));
    if (!existingOrders) {
      localStorage.setItem("orderData", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (billingAddress && isAuthenticated) {
      setValue("fullName", billingAddress.name || "");
      setValue("email", billingAddress.email || "");
      setValue("phone", billingAddress.phone || "");
      setValue("address", billingAddress.address || "");
      setValue("city", billingAddress.city || "");
      setValue("region", billingAddress.region || "");
      setValue("country", billingAddress.country || "Nepal");
    } else {
      reset({});
    }
  }, [setValue, user, isAuthenticated, billingAddress, reset]);

  const onSubmit = (data) => {
    const orderData = {
      userId: isAuthenticated ? user?.email : "",
      billingDetails: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        region: data.region,
        country: data.country,
      },
      shippingDetails: isSameAddress
        ? { ...data } // If shipping is same as billing, use billing details
        : {
            fullName: data.shippingFullName,
            email: data.shippingEmail,
            phone: data.shippingPhone,
            address: data.shippingAddress,
            city: data.shippingCity,
            region: data.shippingRegion,
            country: data.shippingCountry,
          },
      cartItems: cart.map((item) => ({
        name: item.name, // Send only the product name
        price: item.price, // Send only the price
        quantity: item.quantity, // Send the quantity
        color: item.color.color, // Send the color of the item (assuming it's an object with a `color` property)
      })),
      orderTotal: subtotal,
      date: new Date(),
    };

    console.log("Order Data:", orderData);

    // Retrieve existing orders
    const existingOrders = JSON.parse(localStorage.getItem("orderData"));

    // If `existingOrders` is not an array, replace it with an empty array
    if (!Array.isArray(existingOrders)) {
      console.error("Order data in localStorage is not an array. Resetting.");
      localStorage.setItem("orderData", JSON.stringify([]));
    }
    // Add new order to the array
    existingOrders.push(orderData);

    // Save updated orders to localStorage
    localStorage.setItem("orderData", JSON.stringify(existingOrders));

    // dispatch({ type: "CLEAR_CART" });
    // reset();
    // navigate('/');

    alert("Order Placed");
  };

  const subtotal = cart.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  const handleSameAddressChange = () => {
    setIsSameAddress((prev) => !prev);

    if (!isSameAddress) {
      const billingData = getValues();
      setValue("shippingFullName", billingData.fullName);
      setValue("shippingEmail", billingData.email);
      setValue("shippingPhone", billingData.phone);
      setValue("shippingAddress", billingData.address);
      setValue("shippingCity", billingData.city);
      setValue("shippingRegion", billingData.region);
      setValue("shippingCountry", billingData.country);
    } else {
      setValue("shippingFullName", "");
      setValue("shippingEmail", "");
      setValue("shippingPhone", "");
      setValue("shippingAddress", "");
      setValue("shippingCity", "");
      setValue("shippingRegion", "");
      setValue("shippingCountry", "");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1>Checkout</h1>
        <p style={{ color: "black" }}>
          <TiTick /> &nbsp; No Returns.
        </p>
        <p style={{ color: "black" }}>
          <TiTick /> &nbsp; Exchange for manufacturing defect products only.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
          <div className="form-sections">
            {/* Billing Details */}
            <div className="form-section">
              <h2>Billing Details</h2>

              <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                />
                {errors.fullName && <p>{errors.fullName.message}</p>}
              </div>

              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number should contain only numbers",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone number cannot exceed 15 digits",
                    },
                  })}
                />
                {errors.phone && <p>{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && <p>{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && <p>{errors.city.message}</p>}
              </div>

              <div>
                <label htmlFor="region">Region/State</label>
                <input
                  id="region"
                  type="tel"
                  {...register("region", {
                    required: "Region/State is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Region should contain only numbers",
                    },
                  })}
                />
                {errors.region && <p>{errors.region.message}</p>}
              </div>

              <div>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  {...register("country", { required: "Country is required" })}
                >
                  <option value="">Select a country</option>
                  <option value="Nepal">Nepal</option>
                </select>
                {errors.country && <p>{errors.country.message}</p>}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="form-section">
              <h2>Shipping Details</h2>

              <div className="checkbox">
                <label htmlFor="sameAddress">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={isSameAddress}
                    onChange={handleSameAddressChange}
                  />
                  <span>Ship to same address</span>
                </label>
              </div>

              <div>
                <label htmlFor="shippingFullName">Full Name</label>
                <input
                  id="shippingFullName"
                  {...register("shippingFullName", {
                    required: "Full Name is required",
                  })}
                  disabled={isSameAddress}
                />
                {errors.shippingFullName && (
                  <p>{errors.shippingFullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="shippingEmail">Email Address</label>
                <input
                  id="shippingEmail"
                  type="email"
                  {...register("shippingEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  disabled={isSameAddress}
                />
                {errors.shippingEmail && <p>{errors.shippingEmail.message}</p>}
              </div>

              <div>
                <label htmlFor="shippingPhone">Phone</label>
                <input
                  id="shippingPhone"
                  type="tel"
                  {...register("shippingPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number should contain only numbers",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone number cannot exceed 15 digits",
                    },
                  })}
                  disabled={isSameAddress}
                />
                {errors.shippingPhone && <p>{errors.shippingPhone.message}</p>}
              </div>

              <div>
                <label htmlFor="shippingAddress">Address</label>
                <textarea
                  id="shippingAddress"
                  {...register("shippingAddress", {
                    required: "Address is required",
                  })}
                  disabled={isSameAddress}
                />
                {errors.shippingAddress && (
                  <p>{errors.shippingAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="shippingCity">City</label>
                <input
                  id="shippingCity"
                  {...register("shippingCity", {
                    required: "City is required",
                  })}
                  disabled={isSameAddress}
                />
                {errors.shippingCity && <p>{errors.shippingCity.message}</p>}
              </div>

              <div>
                <label htmlFor="shippingRegion">Region/State</label>
                <input
                  id="shippingRegion"
                  {...register("shippingRegion", {
                    required: "Region/State is required",
                  })}
                  disabled={isSameAddress}
                />
                {errors.shippingRegion && (
                  <p>{errors.shippingRegion.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="shippingCountry">Country</label>
                <select
                  id="shippingCountry"
                  {...register("shippingCountry", {
                    required: "Country is required",
                  })}
                  disabled={isSameAddress}
                >
                  <option value="">Select a country</option>
                  <option value="Nepal">Nepal</option>
                </select>
                {errors.shippingCountry && (
                  <p>{errors.shippingCountry.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="checkoutdetail">
            <table className="cart-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const { color, name, photo, price, quantity } = item; // Destructure necessary properties
                  return (
                    <tr key={item._id}>
                      <td className="photo">
                        <img src={photo} alt={name} />
                      </td>
                      <td>
                        {name}
                        <p
                          style={{
                            color: "grey",
                            marginTop: "10px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Color:
                          <span
                            className="color-swatch"
                            style={{
                              backgroundColor: color ? color.color : "gray",
                              display: "inline-block",
                              width: "50px",
                              height: "20px",
                              borderRadius: "5px",
                              marginLeft: "8px",
                              marginTop: "10px",
                            }}
                          >
                            <p style={{ opacity: 0 }}>{color?.color}</p>
                          </span>
                        </p>
                      </td>
                      <td>रू{price}</td>
                      <td>{quantity}</td>
                      <td>रू{price * quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="checkout-wrapper">
              <div className="checkout-box">
                <h2 className="checkout-heading">Cart Totals</h2>
                <div className="checkout-row">
                  <span>Subtotal:</span>
                  <span>रू {subtotal}</span>
                </div>
                <div className="checkout-row">
                  <span>Total:</span>
                  <span>रू {subtotal}</span>
                </div>
              </div>
            </div>
            <button type="submit">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
