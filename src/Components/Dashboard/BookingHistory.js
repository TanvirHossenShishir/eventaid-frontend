import React, { useState, useEffect } from "react";
import "./bookingHistory.css";
import axios from "axios";
import DialogBookHistory from "../Custom/DialogBookHistory";

const BookingHistory = () => {
  const [bookings, setBookings] = useState(null);
  const [render, setRender] = useState(true);

  const handleRender = (status) => {
    setRender(status);
  }

  useEffect(() => {
    let username = JSON.parse(window.localStorage.getItem("userdata")).username;
    axios
      .get(`http://localhost:8081/api/venues/bookings/username/${username}`)
      .then((resp) => {
        console.log(resp.data);
        let result = resp.data;
        setBookings(result);
        setRender(false);
      });
  }, [render]);

  return (
    <div className="book-history-container">
      <label className="book-history-title">BOOKING HISTORY</label>

      <div>
        <div className="book-history-header">
          <label className="b-h-date b-h-frmt">Date</label>
          <label className="b-h-event b-h-frmt">Event</label>
          <label className="b-h-venue b-h-frmt">Venue</label>
          <label className="b-h-total b-h-frmt">Total</label>
          <label className="b-h-status b-h-frmt">Status</label>
        </div>
        <div className="booking-list">
          {bookings &&
            bookings.map((booking) => (
              <DialogBookHistory booking={booking} handleRender={handleRender}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
