import React, { useState } from "react";
import "./manageVenues.css";
import Venue from "./Venue";

const ManageVenues = ({ handleShowAddVenueForm }) => {
  const handleAddVenueClick = () => {
    handleShowAddVenueForm();
  };

  return (
    <div className="manage-venue-container">
      <label className="manage-venue-title">VENUE LIST</label>

      <button className="add-events-btn" onClick={handleAddVenueClick}>
        Add Venue
      </button>

      <div className="venue-list">
        <Venue handleShowAddVenueForm={handleShowAddVenueForm} />
        <Venue handleShowAddVenueForm={handleShowAddVenueForm} />
        <Venue handleShowAddVenueForm={handleShowAddVenueForm} />
        <Venue handleShowAddVenueForm={handleShowAddVenueForm} />
        <Venue handleShowAddVenueForm={handleShowAddVenueForm} />
      </div>
    </div>
  );
};

export default ManageVenues;
