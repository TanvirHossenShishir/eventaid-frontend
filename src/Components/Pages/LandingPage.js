import React, { useState } from "react";
import "./landingPage.css";
import Authenticate from "../Authentication/Authenticate";
import { Link } from "react-router-dom";
import { Prevent } from "../Navigation/Prevent";
import { useNavigate } from "react-router-dom";
import StartAuthentication from "../Authentication/StartAuthentication";

function LandingPage() {
  const [startAuth, setStartAuth] = useState(false);
  const toggleModal = () => {
    console.log(startAuth);
    setStartAuth(!startAuth);
  };

  const [dropdown, setDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <div className="landing-page">
      <h1>Welcome to EventAid</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id nisl
        vel nunc sollicitudin vulputate.
      </p>
      <button>Get Started</button>

      <button>NOTIFICATIONS</button>
    </div>
  );
}

export default LandingPage;
