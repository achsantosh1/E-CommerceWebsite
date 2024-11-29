import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./singleproduct.scss";
import { CartContext } from "../../Features/ContextProvider";
import { DotLoader } from "react-spinners";
import { MdFavorite } from "react-icons/md";
import { useWishlist } from "../../Features/WishlistContext"; // Import WishlistContext
import { useAuth } from "../../Features/AuthContext"; // Import useAuth from AuthContext

const SingleProduct = () => {
  const { dispatch } = useContext(CartContext);
  const { handleWishlist } = useWishlist(); // Use the handleWishlist function
  const { isAuthenticated, logout } = useAuth(); // Get authentication status from AuthContext
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Single product details
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]); // State to store similar products
  const [wishlistMessage, setWishlistMessage] = useState(""); // Wishlist message

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
          setProduct(localProduct);
          setSelectedImage(localProduct.photo);
          const similar = storedProducts.filter(
            (item) =>
              item.category.name === localProduct.category.name &&
              item._id !== productId
          );
          setSimilarProducts(similar);
          setLoading(false);
          return;
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

        const similar = res.data.products.filter(
          (item) =>
            item.category.name === apiProduct.category.name &&
            item._id !== productId
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

  const handleAddToWishlist = () => {
    if (!isAuthenticated) { // Check if the user is authenticated
      setWishlistMessage("Please log in to add to your wishlist.");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      return;
    }

    // Use handleWishlist function from context
    handleWishlist(product);
    // setWishlistMessage("Product added to your wishlist!");
    setTimeout(() => setWishlistMessage(""), 3000); // Clear message after 3 seconds
  };

  if (loading) {
    return <DotLoader />;
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
    console.log("Select color before check:", selectedColor);
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
              <input type="number" value={quantity} readOnly />
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
                onClick={handleAddToCart}
                disabled={!selectedColor}
              >
                Add To Cart
              </button>

              <button
                className="wishlist"
                aria-label="Add to Wishlist"
                onClick={handleAddToWishlist}
                disabled={!localStorage.getItem("authToken")}
              >
                <MdFavorite />
              </button>

              <button className="checkout">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      {wishlistMessage && <div className="wishlist-message">{wishlistMessage}</div>}

      {similarProducts.length > 0 && (
        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="similar-products-list">
            {similarProducts.slice(0, 4).map((similarProduct) => (
              <div key={similarProduct._id} className="similar-product-item">
                <Link to={`/product/${similarProduct._id}`}>
                  <img src={similarProduct.photo} alt={similarProduct.name} />
                  <p>{similarProduct.name}</p>
                  <p>रु {similarProduct.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
