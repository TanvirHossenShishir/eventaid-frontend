import React, { useState } from "react";
import "./manageVenues.css";
import { Prevent } from "../Navigation/Prevent";
import { useNavigate } from "react-router-dom";
import AddVenue from "./AddVenue";

const ManageVenues = ({ handleShowAddVenueForm }) => {

  const handleAddVenueClick = () => {
    handleShowAddVenueForm();
  };

  return (
    <div className="manage-venue-container">
      <label className="manage-venue-title">VENUE LIST</label>

      <button className="add-events-btn" onClick={handleAddVenueClick}>Add Venue</button>
    </div>
  );
};

export default ManageVenues;