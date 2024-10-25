import "./navbar.scss";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import SearchComponent from "../SearchComponent/SearchComponent";


const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="outline-menu">
      <AiOutlineMenu />
      </div>
      
      <ul className="nav-menu">
        {/* <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "grey" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li> */}
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "grey" }} to="/mens">
           For Him
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "grey" }} to="/womens">
            For Her
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        {/* <li onClick={()=>{setMenu('kids')}}><Link style={{textDecoration:'none',color:'grey'}} to='kids'>Kids</Link>{ menu==='kids'? <hr/>: <></>}</li> */}
      </ul>
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />{" "}
        </Link>
        {/* <p>SHOP</p> */}
      </div>
          <div>

     <SearchComponent/>
          </div>

      <div className="nav-login-cart">
        <Link to="/login">
          <button>Log-in</button>
        </Link>
        <Link to="/cart">
          {" "}
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
