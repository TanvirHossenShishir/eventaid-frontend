import React, { useState, useEffect } from "react";
import "./bookingHistory.css";
import axios from "axios";
import DialogBookHistory from "../Custom/DialogBookHistory";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [render, setRender] = useState(true);
  const [myvenues, setMyVenues] = useState([]);

  const handleRender = (status) => {
    setRender(status);
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/api/venues/all`).then((resp) => {
      const result = resp.data;
      const uid = JSON.parse(window.localStorage.getItem("userdata")).id;
      let filteredVenues = result.filter((venue) => venue.userId === uid);
      const role = JSON.parse(window.localStorage.getItem("userdata")).role;
      if(role === "admin"){
        filteredVenues  = result;
      }
      setMyVenues(filteredVenues);
      if (filteredVenues.length > 0) {
        const venueIds = filteredVenues.map((venue) => venue.id);
        const bookingPromises = venueIds.map((venueId) =>
          axios.get(
            `http://localhost:8081/api/venues/bookings/venue/${venueId}`
          )
        );

        Promise.all(bookingPromises)
          .then((responses) => {
            const bookingsData = responses.map((resp) => resp.data);
            const allBookings = bookingsData.reduce(
              (accumulator, currentBookings) => [
                ...accumulator,
                ...currentBookings,
              ],
              []
            );
            setBookings(allBookings);
            setRender(false);
          })
          .catch((error) => {
            console.log("Error fetching bookings:", error);
          });
      }
    });
  }, [render]);

  return (
    <div className="book-history-container">
      <label className="book-history-title">BOOKING LIST</label>

      <div>
        <div className="book-history-header">
          <label className="b-h-date b-h-frmt">Date</label>
          <label className="b-h-event b-h-frmt">Event</label>
          <label className="b-h-venue b-h-frmt">Venue</label>
          <label className="b-h-total b-h-frmt">Total</label>
          <label className="b-h-status b-h-frmt">Status</label>
        </div>
        <div className="booking-list">
          {bookings.map((booking) => (
            <DialogBookHistory
              key={booking.id}
              booking={booking}
              handleRender={handleRender}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
