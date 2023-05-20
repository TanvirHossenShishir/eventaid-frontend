import React, { useState } from "react";
import "./dashboard.css";
import ManageVenues from "./ManageVenues";
import ViewBookings from "./ViewBookings";
import BookVenue from "./BookVenue";
import Notifications from "./Notifications";
import BookingHistory from "./BookingHistory";
import AddVenue from "./AddVenue";
import ViewProfile from "../Profile/ViewProfile";
import EditProfile from "../Profile/EditProfile";
import { Prevent } from "../Navigation/Prevent";
import { useNavigate } from "react-router-dom";
import "./profileDropdown.css";

import { RiUserLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  MdOutlineNotifications,
  MdOutlinePlace,
  MdHistory,
  MdOutlineLogout,
  MdOutlineBorderColor,
} from "react-icons/md";

export default function Dashboard() {
  const [isActive, setIsActive] = useState(1);
  const [isEditable, setIsEditable] = useState(false);
  const [venue, setVenue] = useState([]);

  const options = [
    "View Users",
    "Manage Venues",
    "View Bookings",
    "Book Venue",
    "Booking History",
    "View Venues",
    "Notifications",
    "My Profile",
    "Logout",
  ];
  const navigate = useNavigate();

  const handleRouteView = () => {
    setIsActive(1);
    navigate("/");
  };

  const handleViewUsers = () => {
    setIsActive(11);
    navigate("/");
  };

  const handleBookHistory = () => {
    setIsActive(12);
    navigate("/");
  };

  const handleRouteEdit = () => {
    setIsActive(2);
    navigate("/");
  };

  const handleRouteBook = () => {
    setIsActive(3);
    navigate("/");
  };

  const handleRouteBooking = () => {
    setIsActive(4);
    navigate("/");
  };

  const handleRouteProfile = () => {
    setIsActive(5);
    navigate("/");
  };

  const handleEditProfile = () => {
    setIsActive(8);
    navigate("/");
  };

  const handleRouteLogout = () => {
    alert("Are you sure?");
    window.location.reload(false);
    window.localStorage.clear();
    setIsActive(6);
    navigate("/landing");
  };

  const handleShowAddVenueForm = (venueData, editable) => {
    setIsActive(9);
    setVenue(venueData);
    setIsEditable(editable);
    navigate("/");
  };

  return (
    <div className="dash-main-container">
      <div className="dash-side-tab">
        {options.map((option) => (
          <div className="dash-side-btn-con">
            {/* Option 11 */}
            {JSON.parse(window.localStorage.getItem("userdata")).role ===
              "admin" &&
              option === "View Users" && (
                <button
                  className={`dash-side-btn ${
                    isActive === 11 ? "dash-active" : ""
                  }`}
                  onClick={Prevent(() => handleViewUsers())}
                >
                  <HiOutlineUserGroup
                    size="1.3rem"
                    color="#F39C6B"
                    id="profile-drop-icn"
                  />
                  {option}
                </button>
              )}

            {/* Option 1 */}
            {option === "Manage Venues" && (
              <button
                className={`dash-side-btn ${
                  isActive === 1 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteView())}
              >
                <MdOutlinePlace
                  size="1.5rem"
                  color="#437C90"
                  id="profile-drop-icn"
                />
                {JSON.parse(window.localStorage.getItem("userdata")).role ===
                  "organizer" && option}
                {JSON.parse(window.localStorage.getItem("userdata")).role !==
                  "organizer" && "View Venues"}
              </button>
            )}

            {/* Option 2 */}
            {JSON.parse(window.localStorage.getItem("userdata")).role ===
              "organizer" &&
              option === "View Bookings" && (
                <button
                  className={`dash-side-btn ${
                    isActive === 2 ? "dash-active" : ""
                  }`}
                  onClick={Prevent(() => handleRouteEdit())}
                >
                  <AiOutlineSchedule
                    size="1.4rem"
                    color="#F57F17"
                    id="profile-drop-icn"
                  />
                  {option}
                </button>
              )}

            {/* Option 3 */}
            {JSON.parse(window.localStorage.getItem("userdata")).role ===
              "user" &&
              option === "Book Venue" && (
                <button
                  className={`dash-side-btn ${
                    isActive === 3 ? "dash-active" : ""
                  }`}
                  onClick={Prevent(() => handleRouteBook())}
                >
                  <MdOutlineBorderColor
                    size="1.3rem"
                    color="#E91E63"
                    id="profile-drop-icn"
                  />
                  {option}
                </button>
              )}

            {JSON.parse(window.localStorage.getItem("userdata")).role ===
              "user" &&
              option === "Booking History" && (
                <button
                  className={`dash-side-btn ${
                    isActive === 12 ? "dash-active" : ""
                  }`}
                  onClick={Prevent(() => handleBookHistory())}
                >
                  <MdHistory
                    size="1.4rem"
                    color="#F57F17"
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
                <MdOutlineNotifications
                  size="1.4rem"
                  color="#BF6900"
                  id="profile-drop-icn"
                />
                {option}
              </button>
            )}

            {/* Option 5 */}
            {option === "My Profile" && (
              <button
                className={`dash-side-btn ${
                  isActive === 5 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteProfile())}
              >
                <RiUserLine
                  size="1.3rem"
                  color="#2F4B26"
                  id="profile-drop-icn"
                />
                {option}
              </button>
            )}

            {/* Option 6 */}
            {option === "Logout" && (
              <button
                className={`dash-side-btn ${
                  isActive === 6 ? "dash-active" : ""
                }`}
                onClick={Prevent(() => handleRouteLogout())}
              >
                <MdOutlineLogout
                  size="1.4rem"
                  color="#D63230"
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
      {isActive === 12 && <BookingHistory />}
      {isActive === 3 && <BookVenue />}
      {isActive === 4 && <Notifications />}
      {isActive === 5 && <ViewProfile handleEditProfile={handleEditProfile} />}
      {isActive === 8 && <EditProfile />}
      {isActive === 9 && <AddVenue venueData={venue} editable={isEditable} />}
    </div>
  );
}
