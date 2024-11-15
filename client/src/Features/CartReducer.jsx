const CartReducer = (state = [], action) => {
  switch (action.type) {
    // case "Add":
    //   return [...state, action.product];

     case "AddOrUpdate":
      // Check if the product with the same ID and color is already in the cart
      const existingProductIndex = state.findIndex(
        (product) =>
          product._id === action.product._id &&
          product.color._id === action.product.color._id
      );

      if (existingProductIndex > -1) {
        // Update the quantity and total price for the existing product
        return state.map((product, index) =>
          index === existingProductIndex
            ? {
                ...product,
                quantity: product.quantity + action.product.quantity,
                total: (product.quantity + action.product.quantity) * product.price,
              }
            : product
        );
      }

      // If the product is not in the cart, add it as a new item
      return [...state, { ...action.product, total: action.product.price * action.product.quantity }];



      case "Increase":
        return state.map((product) =>
          product._id === action.id && product.color._id === action.colorId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
  
      case "Decrease":
        return state.map((product) =>
          product._id === action.id && product.color._id === action.colorId
            ? { ...product, quantity: Math.max(1, product.quantity - 1) }
            : product
        );

      case "Remove":

        return state.filter(
          (product) => !(product._id === action.id && product.color._id === action.colorId)
        );

    default:
      return state;
  }
};

export default CartReducer;
