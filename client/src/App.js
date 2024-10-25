import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";


const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer/>
    
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
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
      {
        path: "product/:productId",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <LoginSignup />,
      },
    ],
  },
 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;




