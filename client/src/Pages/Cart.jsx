import { useContext } from "react";
import { CartContext } from "../Features/ContextProvider";
import CartProduct from "../Components/CartProduct/CartProduct";
import { TiTick } from "react-icons/ti";
import "./cart.scss";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);


  const handleRemove = (productId, colorId) => {

    console.log("Removing product:", productId, "with color:", colorId);
    dispatch({
      type: "Remove",
      id: productId, colorId  // Use the product ID for removal
    });
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Shopping Cart</h1>
        <p>
          <TiTick /> &nbsp; No Returns.{" "}
        </p>
        <p>
          <TiTick /> &nbsp; Exchange for manufacturing defect products only.{" "}
        </p>
        
        <table className="cart-table">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((product) => (
                <CartProduct key={product._id} product={product} color={product.color} onRemove={handleRemove} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="cart-empty">
                  No items in the cart.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
