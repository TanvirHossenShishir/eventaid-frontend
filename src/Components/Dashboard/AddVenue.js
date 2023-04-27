import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manageVenues.css";

const AddVenue = () => {
  const [formData, setFormData] = useState({
    venueName: "",
    place: "",
    contact: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEvent = () => {
  };

  const handleAddEquipment = () => {
  };

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="add-venue-container">
      <label className="manage-venue-title">ADD VENUE</label>

      <input
        className="info-row"
        type="text"
        placeholder="Venue Name"
        name="venueName"
        value={formData.venueName}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="text"
        placeholder="Place"
        name="place"
        value={formData.place}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="text"
        placeholder="Contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        autoComplete="off"
      />

      <div className="add-events-section">
        <button className="add-events-btn" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>

      <div className="add-equipments-section">
        <button className="add-equipments-btn" onClick={handleAddEquipment}>
          Add Equipment
        </button>
      </div>

      <div className="save-venue-section">
        <button className="save-venue-btn" onClick={handleSubmit}>
          Save Venue
        </button>
      </div>
    </div>
  );
};

export default AddVenue;
