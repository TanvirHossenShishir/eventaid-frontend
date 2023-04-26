import React from "react";
import { Link } from "react-router-dom";
import Authenticate from "./Authenticate";

function StartAuthentication({ modal, toggleModal, setProfileDropdown }) {
  return (
    <>
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

      {modal && (
        <div className="auth-modal">
          <div onClick={toggleModal} className="overlay"></div>
          <Authenticate />
        </div>
      )}
    </>
  );
}

export default StartAuthentication;
