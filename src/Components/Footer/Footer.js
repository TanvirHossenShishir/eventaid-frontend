import React from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaHeart
} from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import "./footer.css";

function Footer() {
  return (
    <IconContext.Provider value={{ color: "#999", size: "1rem" }}>
      <footer className="footer">
        <div className="footer-row">
          <p className="company-name">
            event<span className="name-part">aid</span>
          </p>
        </div>
        <div className="footer-row">
          <p className="footer-text">
            Copyright &copy;{new Date().getFullYear()} All rights reserved |
            made with <FaHeart color="#ED6A5E" size="0.6rem" /> by TyroCoders
          </p>
        </div>
        <div className="footer-row">
          <Link to={{ pathname: "https://twitter.com" }} target="_blank">
            <FaTwitter class="footer-icn" />
          </Link>
          <Link to={{ pathname: "https://fb.com" }} target="_blank">
            <FaFacebookF class="footer-icn" />
          </Link>
          <Link to={{ pathname: "https://instagram.com" }} target="_blank">
            <FaInstagram class="footer-icn" />
          </Link>
          <Link to={{ pathname: "https://linkedin.com" }} target="_blank">
            <FaLinkedinIn class="footer-icn" />
          </Link>
        </div>
      </footer>
    </IconContext.Provider>
  );
}

export default Footer;
