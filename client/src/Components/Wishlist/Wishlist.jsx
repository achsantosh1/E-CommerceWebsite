import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Features/AuthContext"; // Import the useAuth hook
import { useWishlist } from "../../Features/WishlistContext"; // Import WishlistContext to manage wishlist
import "./wishlist.scss";
import { MdDeleteForever } from "react-icons/md";

const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Access isAuthenticated and validateToken from context
  const { wishlist, removeFromWishlist } = useWishlist(); // Access wishlist from WishlistContext

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Redirect to the product's detail page
  };
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        // If user is not authenticated, redirect to login
        navigate("/login");
        return;
      }

      // If user is authenticated, validate token 
      // const isValid = await validateToken();
      // if (!isValid) {
      //   navigate("/login"); // Redirect to login if token is invalid
      // }
    };

    checkAuth();
  }, [isAuthenticated, navigate]); // Dependency array updated to use isAuthenticated

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="wishlist-item"
              
            >
              <div className="wishlist-card">
                <button
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  <MdDeleteForever style={{ height: "20px", width: "20px" }} />
                </button>
                <img
                  src={item.photo}
                  alt={item.name}
                  className="wishlist-card-image"
                />
                <div className="wishlist-card-content"  onClick={() => handleProductClick(item._id)} >
                  <h3 className="wishlist-card-title">{item.name}</h3>
                  <p className="wishlist-card-price">रु {item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
