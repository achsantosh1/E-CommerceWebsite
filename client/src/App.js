import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import ProductList from "./Components/ProductList/ProductList";
import SearchResult from "./Components/SearchComponent/SearchResult";
import LogIn from "./Components/LogInSignup/LogIn";
import SignUp from "./Components/LogInSignup/SignUp";
import { useEffect, useState } from "react";
import Wishlist from "./Components/Wishlist/Wishlist";

const MainLayout = ({isLoggedIn, handleLogout}) => (
  <>
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear the logged-in user from localStorage
    setIsLoggedIn(false); // Update state to logged out
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout isLoggedIn={isLoggedIn}  handleLogout={handleLogout}/>,
      children: [
        {
          index: true,
          element: <Shop />,
        },
        {
          path: "mens",
          element: <ShopCategory category="men" />,
        },
        {
          path: "womens",
          element: <ShopCategory category="women" />,
        },
        // {
        //   path: "kids",
        //   element: <ShopCategory category="kid" />,
        // },
        { path: "/", element: <ProductList /> },
        { path: "/product/:productId", element: <SingleProduct /> },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "search",
          element: <SearchResult />,
        },
        {
          path: "login",
          element: <LogIn  setIsLoggedIn={setIsLoggedIn}/>,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
