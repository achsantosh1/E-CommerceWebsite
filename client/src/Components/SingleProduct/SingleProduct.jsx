import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./singleproduct.scss";
import { CartContext } from "../../Features/ContextProvider";
import { DotLoader } from 'react-spinners';

const SingleProduct = () => {
  const { dispatch } = useContext(CartContext);

  const { productId } = useParams();
   const [products, setProducts] = useState([]);  // To store all products
  const [product, setProduct] = useState(null);  // Single product details
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]); // State to store similar products

  const fetchAllProducts = async () => {
    try {
      // Try fetching product from localStorage
      const storedProducts = JSON.parse(
        localStorage.getItem("productData") || "[]"
      );

      if (Array.isArray(storedProducts) && storedProducts.length > 0) {
        const localProduct = storedProducts.find(
          (item) => item._id === productId
        );
        if (localProduct) {
          console.log("🚀 Product Found in Local Storage:", localProduct);
          setProduct(localProduct);
          setSelectedImage(localProduct.photo);
          // Find similar products by category
          const similar = storedProducts.filter(
            item => item.category.name === localProduct.category.name && item._id !== productId
          );
          console.log("🚀 ~ fetchAllProducts ~ similar:", similar)
          setSimilarProducts(similar);
          setLoading(false);
          return; // Stop further execution
        }
      }
      // If not found in localStorage, fetch from API
      const res = await axios.get(`/api/v1/product/get-product`);
      
      const apiProduct = res.data.products.find(
        (item) => item._id === productId
      );
     

      if (apiProduct) {
        setProduct(apiProduct);
        setSelectedImage(apiProduct.photo);

          // Find similar products by category
          const similar = res.data.products.filter(
            item => item.category.name === apiProduct.category.name && item._id !== productId
          );
          setSimilarProducts(similar);
        
      } else {
        setIsError("Product not found");
      }
    } catch (error) {
      console.error(error);
      setIsError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [productId]);

  if (loading) {
    return (
     <DotLoader/>
    );
  }

  if (isError) return <div className="error">{isError}</div>;

  // Destructure product properties
  const {
    name,
    description,
    price,

    photo,
    photo1,
    photo2,
    colors = [],
    shipping,
  } = product;

  const handleQuantityChange = (value) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + value));
  };

  const descriptionList = description
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => line.replace(/^-+\s*/, "").trim());

  // Handle Color Selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedImage(color.link); // Update the main image to match the selected color
  };

  const handleAddToCart = () => {
    console.log("Selected Color:", selectedColor);
    if (!selectedColor) {
      alert("Please select a color before adding to the cart");
      return;
    }

    dispatch({
      type: "AddOrUpdate",
      product: { ...product, quantity, color: selectedColor },
    });
  };

  return (
    <>
    <div className="product-detail">
      <div className="product-image-section">
        <div className="main-image">
          <img
            src={selectedImage || "/path/to/default-image.jpg"}
            alt={name || "Product"}
          />
        </div>
      </div>

      <div className="product-info">
        <h2>{name || "Unnamed Product"}</h2>
        <div className="description">
          <ul>
            {descriptionList.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          <p>Price: रु {price}</p>
          <p>Shipping: {shipping ? "Available" : "Not available"}</p>
        </div>

        <div className="quantity-selector">
          <div className="quantity">
            <p>Quantity:</p> <br />
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>

        <div className="color-options">
          <p>Available Colors:</p>
          <div className="color-list">
            {colors.length > 0 ? (
              colors.map((color) => (
                <div
                  key={color._id}
                  className="color-swatch"
                  style={{
                    backgroundColor: color.color,
                  }}
                  onClick={() => handleColorSelect(color)}
                >
                  <img
                    src={color.link}
                    alt={color.color}
                    className="color-image"
                  />
                  {selectedColor?._id === color._id && (
                    <div className="checkmark">&#10003;</div>
                  )}
                </div>
              ))
            ) : (
              <p>No colors available.</p>
            )}
          </div>
          <div className="add_cart">
            <button
              className="addtocart"
              onClick={handleAddToCart} // Call the function that checks color selection
              disabled={!selectedColor} // Disable the button if no color is selected
            >
              Add To Cart
            </button>
            <div className={`color-message ${!selectedColor ? "visible" : ""}`}>
              Please select a color before adding to the cart.
            </div>

            <button className="checkout">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
    
    {similarProducts.length > 0 && (
  <div className="similar-products">
    <h3>Similar Products</h3>
    <div className="similar-products-list">
      {similarProducts.slice(0, 4).map((similarProduct) => (
        <div key={similarProduct._id} className="similar-product-item">
          {/* Wrap each similar product with a Link component using productId */}
          <Link to={`/product/${similarProduct._id}`}>
            <img src={similarProduct.photo} alt={similarProduct.name} />
            <p>{similarProduct.name}</p>
            <p>रु {similarProduct.price}</p>
          </Link>
          {/* <button>Add to Cart</button> */}
        </div>
      ))}
    </div>
  </div>
)}
    

    </>
    
  );
};

export default SingleProduct;
