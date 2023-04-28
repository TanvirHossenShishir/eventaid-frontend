import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./manageVenues.css";

const ManageVenues = ({ handleShowAddVenueForm }) => {
  const handleAddVenueClick = () => {
    handleShowAddVenueForm();
  };
  return (
    <div className="venue-card-container" onClick={handleAddVenueClick}>
      <div className="venue-card-info">Ifa Community Center</div>
      <div className="venue-card-info">Mirpur</div>
      <div className="venue-card-info">880042536</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ManageVenues;
