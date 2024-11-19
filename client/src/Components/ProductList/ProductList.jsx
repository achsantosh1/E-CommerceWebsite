import { useState, useEffect } from "react";
import "./ProductList.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { DotLoader } from 'react-spinners';


const CACHE_KEY= "productData";
const TIMESTAMP_KEY= "productDataTimestamp";
const CACHE_EXPIRY= 60*60*1000; //1 hour in milliseconds

const ProductList = () => {
  const [myData, setMyData] = useState([]);
  const [category, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch product data
  const getMyPostData = async () => {
    try {
      // Check if data is already cached in local storage
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp= localStorage.getItem(TIMESTAMP_KEY);
      const now= new Date().getTime();

      if (cachedData && cachedTimestamp && now - cachedTimestamp < CACHE_EXPIRY) {
        setMyData(JSON.parse(cachedData)); //Use cached data
        setLoading(false); // Set Loading to false immediately
        console.log("🚀 ~ getMyPostData ~ cachedData:", cachedData)
        return;
       
      } else {

        // When the data is not at the local storage
        const res = await axios.get("/api/v1/product/get-product");
        const productData = res.data.products;
        console.log("🚀 ~ getMyPostData ~ productData:", productData)

        setMyData(productData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(productData)); // Cache the fetched data
        localStorage.setItem(TIMESTAMP_KEY, now.toString()); // Save the current timestamp
      }
    } catch (error) {
      setIsError("Error fetching product data: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  // Function to fetch category data
  const getCategoriesData = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      setCategories([{ _id: "all", name: "All" }, ...res.data.category]);
    } catch (error) {
      setIsError("Error fetching categories: " + error.message);
    }
  };

  const clearOldProductData = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
  };

  useEffect(() => {
    getMyPostData();
    getCategoriesData();

      // Optional: Clear old product data on app startup
      const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
      const now = new Date().getTime();
      if (cachedTimestamp && now - cachedTimestamp >= CACHE_EXPIRY) {
        clearOldProductData();
      }
  }, []);

  // Filtered and sorted data
  const filteredData = myData.filter((product) =>
    selectedCategory === "all"
      ? true
      : product.category._id.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Sorting Functions
  const sortHighToLow = () => {
    setMyData((prevData) => [...prevData].sort((a, b) => b.price - a.price));
  };

  const sortLowToHigh = () => {
    setMyData((prevData) => [...prevData].sort((a, b) => a.price - b.price));
  };

  const sortAtoZ = () => {
    setMyData((prevData) =>
      [...prevData].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortZtoA = () => {
    setMyData((prevData) =>
      [...prevData].sort((a, b) => b.name.localeCompare(a.name))
    );
  };

  if (loading) {
    return (
      <DotLoader/>
    );
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      {isError && <div className="error">{isError}</div>}

      <div className="sort">
        <button className="hightolow" onClick={sortHighToLow}>
          Sort By Price (High to Low)
        </button>
        <button className="lowtohigh" onClick={sortLowToHigh}>
          Sort By Price (Low to High)
        </button>
        <button className="AtoZ" onClick={sortAtoZ}>
          Sort By Name (A-to-Z)
        </button>
        <button className="ZtoA" onClick={sortZtoA}>
          Sort By Name (Z-to-A)
        </button>

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
      </div>

      <div className="cart-container">
      {filteredData.map((product) => {
          const { _id, name, price, photo } = product;
          return (
            <Link to={`/product/${_id}`} key={_id} className="card-link">
              <div className="card-item">
                <div className="card-image">
                  <img src={photo} alt={name} />
                </div>
                <div className="card-name">
                  <h2>{name}</h2>
                </div>
                <span className="card-price">Price: रु {price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
