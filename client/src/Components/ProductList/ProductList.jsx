import { useState, useEffect } from "react";
import "./ProductList.scss";
import axios from "axios";

const ProductList = () => {
  const [myData, setMyData] = useState([]);
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
  useEffect(() => {
    getMyPostData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-list">
      <h1>Product List</h1>
      {isError && <div className="error">Error: {isError}</div>} 
      <div className="flex">
      {myData.map((product) => {
        const { _id, name, description, price, photo} = product;
        return <div className="card" key={_id}>
            <div className="card-image">
            <img src={photo} alt="" />
            </div>
            <div className="card-name">
            <h2>{name}</h2>
            </div>
            {/* <p>{description}</p> */}
            <span>Price: ${price}</span>

        </div>;
      })}
      </div>
    </div>
  );
};

export default ProductList;
