import React, { useContext, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import "./checkout.scss";
import { CartContext } from "../../Features/ContextProvider";

const CheckOut = () => {
  const { cart } = useContext(CartContext);
//   console.log("🚀 ~ CheckOut ~ cart:", cart);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [isSameAddress, setIsSameAddress] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

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
            <button type="submit">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
