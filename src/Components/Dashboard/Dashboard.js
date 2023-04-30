import React, { useState } from "react";
import "./dashboard.css";
import ManageVenues from "./ManageVenues";
import ViewBookings from "./ViewBookings";
import BookVenue from "./BookVenue";
import Notifications from "./Notifications";
import AddVenue from "./AddVenue";

import { useNavigate } from "react-router-dom";
import "./profileDropdown.css";
import { CgProfile } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { FaStackOverflow } from "react-icons/fa";
import { Prevent } from "../Navigation/Prevent";

export default function Dashboard() {
  const [isActive, setIsActive] = useState(1);
  const [isEditable, setIsEditable] = useState(false);
  const [venue, setVenue] = useState([]);

  const options = [
    "Manage Venues",
    "View Bookings",
    "Book Venue",
    "Notifications",
  ];
  const navigate = useNavigate();

  const handleRouteView = () => {
    setIsActive(1);
    navigate("/dashboard");
  };

  const handleRouteEdit = () => {
    setIsActive(2);
    navigate("/dashboard");
  };

  const handleRouteBook = () => {
    setIsActive(3);
    navigate("/dashboard");
  };

  const handleRouteBooking = () => {
    setIsActive(4);
    navigate("/dashboard");
  };

  const handleShowAddVenueForm = (venueData, editable) => {
    setIsActive(5);
    setVenue(venueData);
    setIsEditable(editable);
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
                className={`dash-side-btn ${
                  isActive === 1 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteView())}
              >
                <BiEdit size="1.5rem" color="#F57F17" id="profile-drop-icn" />
                {option}
              </button>
            )}

            {/* Option 2 */}
            {option === "View Bookings" && (
              <button
                className={`dash-side-btn ${
                  isActive === 2 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteEdit())}
              >
                <FaStackOverflow
                  size="1.5rem"
                  color="#4DD0E1"
                  id="profile-drop-icn"
                />
                {option}
              </button>
            )}

            {/* Option 3 */}
            {option === "Book Venue" && (
              <button
                className={`dash-side-btn ${
                  isActive === 3 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteBook())}
              >
                <CgProfile
                  size="1.4rem"
                  color="#E91E63"
                  id="profile-drop-icn"
                />
                {option}
              </button>
            )}

            {/* Option 4 */}
            {option === "Notifications" && (
              <button
                className={`dash-side-btn ${
                  isActive === 4 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteBooking())}
              >
                <CgProfile
                  size="1.4rem"
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
      {isActive === 3 && <BookVenue />}
      {isActive === 4 && <Notifications />}
      {isActive === 5 && <AddVenue venueData={venue} editable={isEditable} />}
      {/* <AddVenue
          venue={{
            venueName: "",
            place: "",
            contact: "",
          }}
          event={[]}
          service={[]}
          editable={isEditable}
        /> */}
    </div>
  );
}
