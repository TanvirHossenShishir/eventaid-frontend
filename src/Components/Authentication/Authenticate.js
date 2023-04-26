import React, { useState } from "react";
import "./authenticate.css";
import Signup from "./Signup";
import Signin from "./Signin";

const Authenticate = () => {
  const [loginTab, setTab] = useState(false);
  const setLoginTab = () => setTab(true);
  const setRegisterTab = () => setTab(false);

  return (
    <>
      <div className="main modalContainer">
        <div className="tabs">
          <div
            className={`tab ${!loginTab ? "selected" : ""}`}
            onClick={setRegisterTab}
          >
            R E G I S T E R
          </div>
          <div
            className={`tab ${loginTab ? "selected" : ""}`}
            onClick={setLoginTab}
          >
            L O G I N
          </div>
        </div>
        {!loginTab && <Signup />}
        {loginTab && <Signin />}
      </div>
    </>
  );
};
export default Authenticate;
