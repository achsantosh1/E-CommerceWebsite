import "./navbar.scss";
import logo from "../Assets/logo.webp";
import cart_icon from "../Assets/cart_icon.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

// import SearchComponent from "../SearchComponent/SearchComponent";
import { CartContext } from "../../Features/ContextProvider";
import SearchModal from "../SearchComponent/SearchComponent";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const { cart } = useContext(CartContext);
  const [menu, setMenu] = useState("shop");
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="outline-menu">
        <Link to="/">
          {" "}
          <AiOutlineMenu />{" "}
        </Link>
      </div>

      <ul className="nav-menu">
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
      </ul>
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />{" "}
        </Link>
        {/* <p>SHOP</p> */}
      </div>
      <div>
        <Link>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "white",
              height: "50px",
              width: "50px",
              color: "black",
              border: "none",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <CiSearch
              style={{
                height: "25px",
                width: "25px",
                fontWeight: "700",
                color: "black",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </Link>
        {/* Search Modal */}
        <SearchModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        {/* <SearchComponent /> */}
      </div>

      {isLoggedIn ? (
        <div className="nav-login-cart">
          <Link to="/" ><button onClick={handleLogout} style={{ marginRight: "10px" }}>
            Logout
          </button></Link>
          <Link to="/cart">
            <img src={cart_icon} alt="Cart" />
          </Link>
          <div className="nav-cart-count">{cart.length}</div>
        </div>
      ) : (
        <div className="nav-login-cart">
          <Link to="/login">
            <button>Log-in</button>
          </Link>
          <Link to="/cart">
            <img src={cart_icon} alt="Cart" />
          </Link>
          <div className="nav-cart-count">{cart.length}</div>
        </div>
      )}

      {isLoggedIn ? (
        <Link to="/userprofile">
          {" "}
          <div className="userprofile">
            <CiUser />
          </div>{" "}
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};
export default Navbar;
