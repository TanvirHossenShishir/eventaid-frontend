import React from "react";
import "./landingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>
          Welcome to <br/> <span>eventaid</span>
        </h1>
        <button className="get-started">Get Started</button>
      </div>
    </div>
  );
}

export default LandingPage;
