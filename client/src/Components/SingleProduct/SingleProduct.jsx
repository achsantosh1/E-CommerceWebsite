import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleproduct.scss";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`/api/v1/product/get-product`);
      setProducts(res.data.products);

      //   console.log(setProducts);

      const filteredProduct = res.data.products.find(
        (item) => item._id === productId
      );
      setProduct(filteredProduct);
      if (filteredProduct) {
        setSelectedImage(filteredProduct.photo);
      } else {
        setIsError("Product not found");
      }
    } catch (error) {
      console.error(error);
      setIsError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
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

  return (
    <div className="product-detail">
      <div className="product-image-section">
        <div className="main-image">
          <img
            src={selectedImage || "/path/to/default-image.jpg"}
            alt={name || "Product"}
          />
        </div>
        {/* <div className="image-thumbnails">
          {[photo, photo1, photo2].map((img, idx) => (
            img && (
              <img
                key={idx}
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? "selected" : ""}
              />
            )
          ))}
        </div> */}
      </div>

      <div className="product-info">
        <h2>{name || "Unnamed Product"}</h2>
        <div className="description">
          <ul>
            {descriptionList.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          <p>Price: ${price}</p>
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
                    height: 50,
                    width: 50,
                  }}
                  onClick={() => setSelectedImage(color.link)}
                >
                  <img
                    src={color.link}
                    alt={color.color}
                    className="color-image"
                  />
                </div>
              ))
            ) : (
              <p>No colors available.</p>
            )}
          </div>
          <div className="add_cart">
            <button className="addtocart">Add To Cart</button>
            <button className="checkout">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
