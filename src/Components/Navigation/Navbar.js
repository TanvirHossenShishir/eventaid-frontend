import "./navbar.css";
import React, { useState } from "react";
import Authenticate from "../Authentication/Authenticate";
import { navItems } from "./NavItems";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { HiOutlineLogin } from "react-icons/hi";
import { AiOutlineShopping } from "react-icons/ai";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
// import Avatar from "@mui/material/Avatar";
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
    <IconContext.Provider value={{ color: "white", size: "1rem" }}>
      <div class="navheader fixed-nav-bar">
        <Link to="/" class="logo">
            event<span className="logo-part">aid</span>
          </Link>
            <Link to={{ pathname: "https://twitter.com" }} target="_blank">
              <FaTwitter class="icn" />
            </Link>
            <Link to={{ pathname: "https://fb.com" }} target="_blank">
              <FaFacebookF class="icn" />
            </Link>
            <Link to={{ pathname: "https://instagram.com" }} target="_blank">
              <FaInstagram class="icn" />
            </Link>
            <Link to={{ pathname: "https://linkedin.com" }} target="_blank">
              <FaLinkedinIn class="icn" />
            </Link>
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
