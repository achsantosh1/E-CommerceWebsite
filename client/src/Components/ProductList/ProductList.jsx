import { useState, useEffect } from "react";
import "./ProductList.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [myData, setMyData] = useState([]);
  const [category, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(true);

  const getMyPostData = async () => {
    try {
      const res = await axios.get("/api/v1/product/get-product");
      setMyData(res.data.products);
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
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
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
                <span className="card-price">Price: ${price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
