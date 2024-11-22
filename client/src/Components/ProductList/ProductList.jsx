import { useState, useEffect } from "react";
import "./ProductList.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { FaTh, FaList } from "react-icons/fa"; // React Icons for grid and list view
import { motion } from "framer-motion"; // Framer Motion for animations

const CACHE_KEY = "productData";
const TIMESTAMP_KEY = "productDataTimestamp";
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

const ProductList = () => {
  const [myData, setMyData] = useState([]);
  const [category, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // State for grid/list view

  const getMyPostData = async () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
      const now = new Date().getTime();

      if (
        cachedData &&
        cachedTimestamp &&
        now - cachedTimestamp < CACHE_EXPIRY
      ) {
        setMyData(JSON.parse(cachedData));
        setLoading(false);
        return;
      } else {
        const res = await axios.get("/api/v1/product/get-product");
        const productData = res.data.products;
        setMyData(productData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(productData));
        localStorage.setItem(TIMESTAMP_KEY, now.toString());
      }
    } catch (error) {
      setIsError("Error fetching product data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesData = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      setCategories([{ _id: "all", name: "All" }, ...res.data.category]);
    } catch (error) {
      setIsError("Error fetching categories: " + error.message);
    }
  };

  useEffect(() => {
    getMyPostData();
    getCategoriesData();

    const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
    const now = new Date().getTime();
    if (cachedTimestamp && now - cachedTimestamp >= CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    }
  }, []);

  const filteredData = myData.filter((product) =>
    selectedCategory === "all"
      ? true
      : product.category._id.toLowerCase() === selectedCategory.toLowerCase()
  );

  if (loading) {
    return <DotLoader />;
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      {isError && <div className="error">{isError}</div>}

      <div className="controls">
        <div className="sort">
          <button
            onClick={() =>
              setMyData((prev) => [...prev].sort((a, b) => b.price - a.price))
            }
          >
            Sort By Price (High to Low)
          </button>
          <button
            onClick={() =>
              setMyData((prev) => [...prev].sort((a, b) => a.price - b.price))
            }
          >
            Sort By Price (Low to High)
          </button>
          <button
            onClick={() =>
              setMyData((prev) =>
                [...prev].sort((a, b) => a.name.localeCompare(b.name))
              )
            }
          >
            Sort By Name (A-to-Z)
          </button>
          <button
            onClick={() =>
              setMyData((prev) =>
                [...prev].sort((a, b) => b.name.localeCompare(a.name))
              )
            }
          >
            Sort By Name (Z-to-A)
          </button>
        </div>

        <div className="category-dropdown">
          <label htmlFor="category">Filter by Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {category.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <FaTh
            className={`view-icon ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          />
          <FaList
            className={`view-icon ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          />
        </div>
      </div>

      {/* Use motion.div for animations */}
      <motion.div
        className={`cart-container ${viewMode}`}
        layout
        transition={{ type: "keyframes", stiffness: 300, duration: 0.6, ease:"easeInOut"}}
      >
        {filteredData.map((product) => {
          const { _id, name, price, photo, description } = product;

          const descriptionList = description
            .split(/\r?\n/)
            .filter((line) => line.trim() !== "")
            .map((line) => line.replace(/^-+\s*/, "").trim());

          return (
            <Link to={`/product/${_id}`} key={_id} className="card-link">
              <div className="card-item">
                <div className="card-image">
                  <img src={photo} alt={name} />
                </div>
                <div className="listview">
                  <div className="card-details">
                    <h2 className="card-name">{name}</h2>
                    <span className="card-price">Price: रु {price}</span>
                  </div>
                  <div className="description">
                    <ul>
                      {descriptionList.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProductList;
