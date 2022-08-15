import React, { useState, useContext, useEffect, useRef } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import Down from "./icon/down.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import User from "./icon/user.svg";
import Logout from "./icon/logout.svg";
import Home from "./icon/home.svg";
import Order from "./icon/order.svg";
import Service from "./icon/service.svg";
import Review from "./icon/review.svg";
import Info from "./icon/info.svg";
import Sigin from "./icon/sigin.svg";
import Plus from "./icon/plus.svg";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    });
  });

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }

  const logoutUser = async () => {
    await axios.get("user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product" onClick={() => setMenu(!menu)}>
            <img src={Plus} width="18" className="user-icon" alt="plus" />
            Add Products
          </Link>
        </li>
        <li>
          <Link to="/category" onClick={() => setMenu(!menu)}>
            <img src={Plus} width="18" className="user-icon" alt="plus" />
            Add Categories
          </Link>
        </li>

        <li>
          <Link to="/status" onClick={() => setMenu(!menu)}>
            <img src={Order} alt="" width="16" className="user-icon" />
            User Orders
          </Link>
        </li>
        <li>
          <Link to="/banner" onClick={() => setMenu(!menu)}>
            <img src={Plus} width="18" className="user-icon" alt="plus" />
            Add Banner
          </Link>
        </li>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        {!isAdmin && (
          <li>
            <Link to="/order_history" onClick={() => setMenu(!menu)}>
              <img src={Order} alt="" width="16" className="user-icon" />
              My Orders
            </Link>
          </li>
        )}
        <li>
          <Link to="/profile" onClick={() => setMenu(!menu)}>
            <img src={User} alt="" width="16" className="user-icon" />
            My Account
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            <img src={Logout} alt="" width="19" className="user-icon" />
            Logout
          </Link>
        </li>
      </>
    );
  };
  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header ref={menuRef}>
      <div className="menu" onClick={() => setMenu((menu) => !menu)}>
        <img src={Menu} alt="" width="30" className="menu" />
      </div>

      <div className="logo">
        <h1>
          <Link
            style={{
              color: "black",
              fontFamily: "-moz-initial",
              letterSpacing: "2px",
              position: "relative",
              top: "8px",
            }}
            to="/"
          >
            {isAdmin ? "Admin" : "Food Deliver"}{" "}
          </Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/" onClick={() => setMenu(!menu)}>
            <img src={Home} alt="" width="21" className="user-icon" />
            {isAdmin ? "Home" : "Home"}
          </Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login" onClick={() => setMenu(!menu)}>
              <img src={Sigin} alt="" width="19" className="user-icon" />
              Login
            </Link>
          </li>
        )}

        <li className="dropdown">
          <img
            src={Info}
            alt=""
            width="7"
            style={{
              marginRight: "15px",
              marginLeft: "5px",
              position: "relative",
              bottom: "-3px",
              cursor: "pointer",
            }}
          />
          <button className="dropbtn">About </button>
          <img
            className="downimg"
            src={Down}
            alt=""
            width="12"
            style={{
              marginLeft: "5px",
              position: "relative",
              top: "4px",
              marginRight: "15px",
            }}
          />
          <div className="dropdown-content">
            <Link className="drp" to="/contact" onClick={() => setMenu(!menu)}>
              Contact Us
            </Link>
            <Link
              className="drp"
              to="/termandcondition"
              onClick={() => setMenu(!menu)}
            >
              Term and Condition
            </Link>
            <Link
              className="drp"
              to="/privatepolicy"
              onClick={() => setMenu(!menu)}
            >
              Private Policy
            </Link>
          </div>
        </li>

        {/* <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu"  />
        </li> */}
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart?.length}</span>
          <Link to={{ pathname: "/cart" }}>
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
