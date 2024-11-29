import { useContext } from "react";
import "./cartproduct.scss";
import { MdDeleteForever } from "react-icons/md";
import { CartContext } from "../../Features/ContextProvider";

const CartProduct = ({ product, onRemove }) => {
  const { dispatch, cart } = useContext(CartContext);
  
  // Get the current quantity from the cart context
  

  const currentProduct = cart.find(
    (item) => item._id === product._id && item.color._id === product.color._id
  );
  const quantity = currentProduct ? currentProduct.quantity : 1; // Default to 1 if not found
  
  const { color } = product;
  const subtotal = quantity * product.price;

  const Increase = (_id,colorId) => {
    dispatch({ type: "Increase", id: _id, colorId });
  };

  const Decrease = (_id,colorId) => {
    dispatch({ type: "Decrease", id: _id ,colorId});
  };

  return (
    <tr>
      <td className="cart-image">
        <img src={product.photo} alt={product.name} />
      </td>

      <td className="cart-product">
        <h3>{product.name}</h3>
        <p>
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
            }}
          >
            <p style={{ opacity: 0 }}>{color.color}</p>
          </span>
        </p>
      </td>

      <td className="cart-price">
        <p>${product.price}</p>
      </td>

      <td className="cart-quantity">
        <div className="quantity-selector">
          <div className="quantity">
            <button onClick={() => Decrease(product._id, product.color._id)}>-</button>
            {quantity}
            <button onClick={() => Increase(product._id, product.color._id)}>+</button>
          </div>
        </div>
      </td>

      <td className="cart-subtotal">
        <p>रू{subtotal}</p>
      </td>

      <td className="cart-remove">
      <button onClick={() => onRemove(product._id, product.color._id)}>
          <MdDeleteForever style={{ height: "20px", width: "20px" }} />
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
