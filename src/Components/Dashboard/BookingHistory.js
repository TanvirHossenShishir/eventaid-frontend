import React, { useState, useEffect } from "react";
import "./bookingHistory.css";
import DialogPopup from "../Custom/DialogPopup";
import axios from "axios";

const BookingHistory = () => {
  const [bookings, setBookings] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    let username = JSON.parse(window.localStorage.getItem("userdata")).username;
    axios
      .get(`http://localhost:8081/api/venues/bookings/username/${username}`)
      .then((resp) => {
        console.log(resp.data);
        let result = resp.data;
        setBookings(result);
      });
  }, []);

  const handleClick = (booking) => {
    console.log(booking.event.eventName);
    setSelectedBooking(booking);
    alert(booking.event.eventName);
  }

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
              <div
                key={booking.id}
                className="book-history-row"
                onClick={() => handleClick(booking)}
              >
                <label className="b-h-date b-r-frmt brdr-left">
                  2023-05-18
                </label>
                <label className="b-h-event b-r-frmt">
                  {booking.event.eventName}
                </label>
                <label className="b-h-venue b-r-frmt">
                  {booking.venue.venueName}
                </label>
                <label className="b-h-total b-r-frmt">
                  {booking.totalCost}/-
                </label>
                <label className="b-h-status b-r-frmt brdr-right">
                  Pending
                </label>
              </div>
            ))}
        </div>
      </div>

      {selectedBooking && (
        <DialogPopup booking={selectedBooking} valid={false} />
      )}
    </div>
  );
};

export default BookingHistory;
