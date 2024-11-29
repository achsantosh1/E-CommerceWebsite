import React, { createContext, useState, useContext, useEffect } from "react";
import { decodeJwt } from "jose";

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = decodeJwt(token); //Decode the JWT
        console.log("Decoded Token Payload:", decoded);
        console.log("User list", localStorage.getItem("users"));

        if (decoded && decoded.email) {
          localStorage.setItem("userId", decoded.email);
          setUserId(decoded.email);
          return decoded.email;
        } else {
          console.error("Email not found in decoded token");
          return null;
        }
      } catch (error) {
        console.error("Error decoding token: ", error);
        return null;
      }
    }
    return null;
  };

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || getUserIdFromToken();
  });
  console.log("🚀 ~ WishListProvider ~ userId:", userId);

  const [wishlist, setWishlist] = useState(() => {
    if (userId) {
      const storedWishlist = localStorage.getItem(`wishListItems_${userId}`);
      console.log(
        "🚀 ~ const[wishlist,setWishlist]=useState ~ storedWishlist:",
        storedWishlist
      );
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });
  // Sync userId with localStorage when it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  // Update wishlist based on userId changes
  useEffect(() => {
    if (userId) {
      const storedWishlist = localStorage.getItem(`wishListItems_${userId}`);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    } else {
      setWishlist([]);
    }
  }, [userId]);

 


 // Persist wishlist changes in localStorage
  useEffect(() => {
    if (userId) {
      if (wishlist.length > 0) {
        localStorage.setItem(
          `wishListItems_${userId}`,
          JSON.stringify(wishlist)
        );
      } else {
        localStorage.removeItem(`wishListItems_${userId}`);
      }
    }
  }, [wishlist, userId]);

  const handleWishlist = (item) => {
    if (!userId) {
      console.log("🚀 ~ handleWishlist ~ userId:", userId);
      alert("User not logged in. Please log in to manage your wishlist.");
      return;
    }

    setWishlist((prevWishlist) => {
      // Check if the item is already in the wishlist
      const exists = prevWishlist.some((wishListItem) => {
        console.log("🚀 ~ setWishlist ~ wishListItem:", wishListItem);
        return wishListItem._id === item._id;
      });

      if (exists) {
        alert("Item already in wishlist");
        return prevWishlist; // Return the previous state if the item exists
      } else {
        alert("Item added to wishlist.");
        return [...prevWishlist, item]; // Add the new item to the state
      }
    });
  };


  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item._id !== productId);
      alert("Item removed from wishlist.");
      return updatedWishlist;
    });
  };


  return (
    <WishListContext.Provider
      value={{
        wishlist,
        setWishlist,
        handleWishlist,
        userId,
        setUserId,
        getUserIdFromToken,
        removeFromWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => useContext(WishListContext);
