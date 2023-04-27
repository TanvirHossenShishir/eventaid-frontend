import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Avatar from "@mui/material/Avatar";
import ManageVenues from "./ManageVenues";
import ViewBookings from "./ViewBookings";
import Notifications from "./Notifications"
import AddVenue from "./AddVenue";

import { useNavigate } from "react-router-dom";
import "./profileDropdown.css";
import { CgProfile } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { HiUpload } from "react-icons/hi";
import { FaStackOverflow } from "react-icons/fa";
import { Prevent } from "../Navigation/Prevent";

export default function Dashboard() {
  const [isActive, setIsActive] = useState(1);
  const [showAddVenueForm, setShowAddVenueForm] = useState(false);

  const options = ["Manage Venues", "View Bookings", "Notifications"];
  const navigate = useNavigate();

  const handleRouteView = () => {
    setIsActive(1);
    navigate("/dashboard");
  };

  const handleRouteEdit = () => {
    setIsActive(2);
    navigate("/dashboard");
  };

  const handleRouteBooking = () => {
    setIsActive(3);
    navigate("/dashboard");
  };

  const handleShowAddVenueForm = () => {
    setIsActive(4);
    navigate("/dashboard");
  };

  return (
    <div className="dash-main-container">
      <div className="dash-side-tab">
        {options.map((option) => (
          <div className="dash-side-btn-con">
            {/* Option 1 */}
            {option === "Manage Venues" && (
              <button
                style={{
                  borderRight: isActive === 1 ? "2px solid teal" : "",
                  backgroundColor: isActive === 1 ? "#eee" : "",
                }}
                className="dash-side-btn"
                onClick={Prevent(() => handleRouteView())}
              >
                <CgProfile size="1.4rem" color="#F57F17" id="nav-drop-icn" />
                {option}
              </button>
            )}

            {/* Option 2 */}
            {option === "View Bookings" && (
              <button
                style={{
                  borderRight: isActive === 2 ? "2px solid teal" : "",
                  backgroundColor: isActive === 2 ? "#eee" : "",
                }}
                className="dash-side-btn"
                onClick={Prevent(() => handleRouteEdit())}
              >
                <BiEdit size="1.5rem" color="#4DD0E1" id="profile-drop-icn" />
                {option}
              </button>
            )}

            {/* Option 3 */}
            {option === "Notifications" && (
              <button
                style={{
                  borderRight: isActive === 3 ? "2px solid teal" : "",
                  backgroundColor: isActive === 3 ? "#eee" : "",
                }}
                className="dash-side-btn"
                onClick={Prevent(() => handleRouteBooking())}
              >
                <FaStackOverflow
                  size="1.5rem"
                  color="#E91E63"
                  id="profile-drop-icn"
                />
                {option}
              </button>
            )}
          </div>
        ))}
      </div>

      {isActive === 1 && (
        <ManageVenues handleShowAddVenueForm={handleShowAddVenueForm} />
      )}
      {isActive === 2 && <ViewBookings />}
      {isActive === 3 && <Notifications />}
      {isActive === 4 && <AddVenue />}
    </div>
  );
}
