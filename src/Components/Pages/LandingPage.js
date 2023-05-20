import React, { useState } from "react";
import Authenticate from "../Authentication/Authenticate"
import "./landingPage.css";

const LandingPage = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    console.log(modal);
    setModal(!modal);
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>
          Welcome to <br /> <span>eventaid</span>
        </h1>
        <button className="get-started" onClick={toggleModal}>
          Get Started
        </button>
      </div>
      {modal && (
        <div className="auth-modal">
          <div onClick={toggleModal} className="overlay"></div>
          <Authenticate />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
