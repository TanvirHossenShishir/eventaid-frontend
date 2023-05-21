import React, { useState, useEffect } from "react";
import "./manageVenues.css";
import Venue from "./Venue";
import axios from "axios";

const ManageVenues = ({ handleShowAddVenueForm }) => {
  const handleAddVenueClick = () => {
    handleShowAddVenueForm(
      {
        venueName: "",
        place: "",
        contact: "",
        events: [],
        foods: [],
      },
      true
    );
  };

  const [venues, setVenues] = useState([]);
  const [myvenues, setMyVenues] = useState([]);
  const [render, setRender] = useState(true);

  const handleRender = (status) => {
    setRender(status);
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/api/venues/all`).then((resp) => {
      console.log(resp.data);
      let result = resp.data;
      const uid = JSON.parse(window.localStorage.getItem("userdata")).id;
      let filteredVenues = result.filter((venue) => venue.userId === uid);
      setMyVenues(filteredVenues);
      filteredVenues = result.filter((venue) => venue.userId !== uid);
      setVenues(filteredVenues);
      setRender(false);
      console.log(venues);
    });
  }, [render]);

  return (
    <div className="manage-venue-container">
      <label className="manage-venue-title">VENUE LIST</label>

      {JSON.parse(window.localStorage.getItem("userdata")).role !== "user" && (
        <div>
          <button className="add-events-btn" onClick={handleAddVenueClick}>
            Add Venue
          </button>
          <label className="add-venue-val vl-top-mar">MY VENUES:</label>
          {!myvenues && (
            <label className="empty-venue-text">
              You do not have added any venue yet.
            </label>
          )}
          <div className="venue-list">
            {myvenues.map((venue) => (
              <Venue
                id={venue.id}
                venueData={venue}
                editable={true}
                name={venue.venueName}
                place={venue.place}
                contact={venue.contact}
                handleShowAddVenueForm={handleShowAddVenueForm}
                showBtn={true}
                handleRender={handleRender}
              />
            ))}
          </div>

          <label className="add-venue-val vl-top-mar">OTHER VENUES:</label>
        </div>
      )}
      <div className="venue-list">
        {venues.map((venue) => (
          <Venue
            id={venue.id}
            venueData={venue}
            editable={false}
            name={venue.venueName}
            place={venue.place}
            contact={venue.contact}
            handleShowAddVenueForm={handleShowAddVenueForm}
            showBtn={false}
            handleRender={handleRender}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageVenues;
