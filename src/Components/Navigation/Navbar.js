import "./navbar.css";
import React, { useState } from "react";
import Authenticate from "../Authentication/Authenticate";
import { navItems } from "./NavItems";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { HiOutlineLogin } from "react-icons/hi";

import { Prevent } from "./Prevent"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    console.log(modal);
    setModal(!modal);
  };

  const [dropdown, setDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navigate = useNavigate();

  return (
    <IconContext.Provider value={{ color: "#ED6A5E", size: "1rem" }}>
      <div class="navheader fixed-nav-bar">
        <Link to="/" class="logo">
          event<span className="logo-part">aid</span>
        </Link>

        {navItems.map((item) => {
          if (item.title === "Blog") {
            return (
              <Link
                to={item.path}
                className="navbar-link"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                {item.title}
                {/* {dropdown && <NavDropdown />} */}
              </Link>
            );
          }
          return (
            <div
              className="navbar-link"
              onClick={Prevent(() => navigate(item.path))}
            >
              {item.title}
            </div>
          );
        })}

        {!window.localStorage.getItem("isAuthenticated") && (
          <button onClick={toggleModal} className="top-buttons">
            <HiOutlineLogin class="login-icn" />
            LOGIN
          </button>
        )}
        {window.localStorage.getItem("isAuthenticated") && (
          <Link
            to="/dashboard"
            className="top-buttons profile-link"
            onMouseEnter={() => setProfileDropdown(true)}
            onMouseLeave={() => setProfileDropdown(false)}
          >
            {/* <Avatar
                  alt="Remy Sharp"
                  src="/images/avatar.jpg"
                  sx={{ width: 18, height: 18 }}
                /> */}
            <div className="profile-txt">
              {JSON.parse(window.localStorage.getItem("userdata")).username}
            </div>
          </Link>
        )}

        {modal && (
          <div className="auth-modal">
            <div onClick={toggleModal} className="overlay"></div>
            <Authenticate />
          </div>
        )}
      </div>
    </IconContext.Provider>
  );
};

export default Navbar;
