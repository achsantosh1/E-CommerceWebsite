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
import Wishlist from "./Components/Wishlist/Wishlist";
import { AuthProvider, useAuth } from "../src/Features/AuthContext"; // Import AuthContext
import { WishListProvider } from "./Features/WishlistContext";
import CheckOut from "./Components/Checkout/CheckOut";
import UserProfile from "./Components/userprofile/UserProfile";
import NotFound from "./Components/NotFound/NotFound";
import { BillingProvider } from "./Features/BillingContext";
import OrderHistory from "./Components/OrderHistory/OrderHistory";

// Main Layout component
const MainLayout = () => {
  const { isAuthenticated, logout } = useAuth(); // Use AuthContext values
  return (
    <>
      <Navbar isLoggedIn={isAuthenticated} handleLogout={logout} />
      <Outlet />
      <Footer />
    </>
  );
};

// App component
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />, // Pass MainLayout directly
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
        {
          path: "/",
          element: <ProductList />,
        },
        {
          path: "/product/:productId",
          element: <SingleProduct />,
        },
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
          element: <LogIn />, // No need to pass setIsLoggedIn
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "checkout",
          element: <CheckOut />,
        },
        {
          path: "userprofile",
          element: <UserProfile />,
        },
        {
          path: "orderhistory",
          element: <OrderHistory />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <BillingProvider>
        <WishListProvider>
          <RouterProvider router={router} />
        </WishListProvider>
      </BillingProvider>
    </AuthProvider>
  );
};

export default App;
