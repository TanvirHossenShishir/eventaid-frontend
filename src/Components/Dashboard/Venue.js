import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./manageVenues.css";
import axios from "axios";

const Venue = ({
  handleShowAddVenueForm,
  venueData,
  editable,
  id,
  name,
  place,
  contact,
  showBtn,
  handleRender,
}) => {
  const handleAddVenueClick = () => {
    handleShowAddVenueForm(venueData, editable, true);
    
  };
  return (
    <div className="venue-card-container" onClick={handleAddVenueClick}>
      <div className="venue-card-attribute ">Venue Name: </div>
      <div className="venue-card-info">{name}</div>
      <div className="venue-card-attribute ">Location: </div>
      <div className="venue-card-info">{place}</div>
      <div className="venue-card-attribute ">Contact: </div>
      <div className="venue-card-info">{contact}</div>
      {showBtn && (
        <button
          className="venue-del-btn"
          onClick={(e) => {
            e.stopPropagation();
            axios
              .delete(`http://localhost:8081/api/venues/del/${id}`)
              .then((resp) => {
                console.log(resp.data);
                handleRender(true);
              });
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Venue;
