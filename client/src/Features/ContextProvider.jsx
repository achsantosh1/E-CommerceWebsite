import React, { createContext, useReducer, useEffect } from 'react';
import CartReducer from './CartReducer';

export const CartContext = createContext();

const ContextProvider = ({ children }) => {
  // Load initial cart data from localStorage
  const initialState = JSON.parse(localStorage.getItem('cart')) || [];

  const [cart, dispatch] = useReducer(CartReducer, initialState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
            // Log the cart data in localStorage
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      console.log("Cart data in localStorage:", savedCart);
    } else {
      localStorage.removeItem('cart'); // Optionally, remove cart from localStorage if it's empty
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;
