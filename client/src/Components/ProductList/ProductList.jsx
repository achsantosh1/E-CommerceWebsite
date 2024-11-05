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

      // console.log(res.data.products);
      setMyData(res.data.products);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesData = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");

      // console.log(res.data.category)

      setCategories([{ _id: "all", name: "All" }, ...res.data.category]);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getMyPostData();
    getCategoriesData();
  }, []);

  const filteredData = myData.filter((product) =>
    selectedCategory === "all"
      ? true
      : product.category._id.toLowerCase() === selectedCategory.toLowerCase()
  );

  if (loading) return <div>Loading...</div>;

  const hightolow = () => {
    const sorted = [...filteredData].sort((a, b) => b.price - a.price);
    setMyData(sorted);
  };

  const lowtohigh = () => {
    const sorted = [...filteredData].sort((a, b) => a.price - b.price);
    setMyData(sorted);
  };

  const AtoZ = () => {
    const sorted = [...filteredData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setMyData(sorted);
  };

  const ZtoA = () => {
    const sorted = [...filteredData].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setMyData(sorted);
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      {isError && <div className="error">Error: {isError}</div>}

      <div className="sort">
        <button className="hightolow" onClick={hightolow}>
          Sort By Price (High to Low)
        </button>
        <button className="lowtohigh" onClick={lowtohigh}>
          Sort By Price (Low to high)
        </button>
        <button className="AtoZ" onClick={AtoZ}>
          {" "}
          Sort By Name (A-to-Z)
        </button>
        <button className="ZtoA" onClick={ZtoA}>
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

      <div className="flex">
        {filteredData.map((product) => {
          const { _id, name, description, price, photo } = product;
          return (
            <Link to={`/product/${_id}`} key={_id} className="card-link">
              <div className="card">
                <div className="card-image">
                  <img src={photo} alt={name} />
                </div>
                <div className="card-name">
                  <h2>{name}</h2>
                </div>
                <span>Price: ${price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
