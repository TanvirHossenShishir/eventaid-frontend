import React, { useState, useEffect } from "react";
import "./bookingHistory.css";
import Venue from "./Venue";
import axios from "axios";

const BookingHistory = () => {

  const [venues, setVenues] = useState([]);
  const [myvenues, setMyVenues] = useState([]);

  useEffect(() => {
    let username = JSON.parse(window.localStorage.getItem("userdata")).username;
    axios.get(`http://localhost:8081/api/venues/bookings/username/${username}`).then((resp) => {
      console.log(resp.data);
      // let result = resp.data;
      // const uid = JSON.parse(window.localStorage.getItem("userdata")).id;
      // let filteredVenues = result.filter((venue) => venue.userId === uid);
      // setMyVenues(filteredVenues);
      // filteredVenues = result.filter((venue) => venue.userId !== uid);
      // setVenues(filteredVenues);
      // console.log(venues);
    });
  }, []);

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
        <div className="book-history-row">
          <label className="b-h-date b-r-frmt brdr-left">2023-05-18</label>
          <label className="b-h-event b-r-frmt">Birthday Party</label>
          <label className="b-h-venue b-r-frmt">Mirpur Community Center</label>
          <label className="b-h-total b-r-frmt">12500/-</label>
          <label className="b-h-status b-r-frmt brdr-right">Pending</label>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;