import React, { useState } from "react";
import "./bookVenue.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "../3rdParty/index.css";


const BookVenue = () => {
  const [place, setPlace] = useState("");
  const [venue, setVenue] = useState("");
  const [event, setEvent] = useState("");
  const [guests, setGuests] = useState("");
  const [food, setFood] = useState("");
  const [service, setService] = useState("");
  const [eventCost, setEventCost] = useState(0);
  const [foodCost, setFoodCost] = useState(0);
  const [serviceCost, setServiceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
  };

  const handleEventChange = (e) => {
    setEvent(e.target.value);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleFoodChange = (e) => {
    setFood(e);
  };

  const handleServiceChange = (e) => {
    setService(e);
  };

  const calculateCosts = () => {
    //Cost Calculation
    setEventCost(eventCost);
    setFoodCost(foodCost);
    setServiceCost(serviceCost);
    setTotalCost(totalCost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateCosts();
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const options = [
    { label: "Option 1", value: "option_1" },
    { label: "Option 2", value: "option_2" },
    { label: "Option 3", value: "option_3" },
    { label: "Option 4", value: "option_4" },
  ];

  return (
    <div className="book-venue-container">
      <form onSubmit={handleSubmit}>
        <div className="book-form-con">
          <div className="book-side-con">
            <label className="manage-venue-title">Book Event</label>
            <label className="book-info">LOCATION:</label>
            <select
              required
              className="book-dropdown"
              name="place"
              value={place}
              onChange={handlePlaceChange}
            >
              <option value="" selected disabled hidden>
                Select...
              </option>
              <option value="Mirpur">Mirpur</option>
              <option value="Uttara">Uttara</option>
            </select>

            <label className="book-info">VENUE:</label>
            <select
              required
              className="book-dropdown"
              name="place"
              value={venue}
              onChange={handleVenueChange}
            >
              <option value="" selected disabled hidden>
                Select...
              </option>
              <option value="Hotel">Hotel</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Restaurant">Restaurant</option>
            </select>

            <label className="book-info">EVENT:</label>
            <select
              required
              className="book-dropdown"
              name="place"
              value={event}
              onChange={handleEventChange}
            >
              <option value="" selected disabled hidden>
                Select...
              </option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Corporate Event">Corporate Event</option>
            </select>

            <label className="book-info">FOODS:</label>
            <div className="book-mul-sel">
              <MultiSelect onChange={handleFoodChange} options={options} />
            </div>

            <label className="book-info">SERVICES:</label>
            <div className="book-mul-sel">
              <MultiSelect onChange={handleServiceChange} options={options} />
            </div>
          </div>

          <div className="book-side-con">
          <div className="label-con side-margin-fix">
            <label className="book-info">DATE:</label>
            <label className="book-info">NO OF GUEST:</label>
          </div>
            <div className="book-date">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onDatesChange={handleDatesChange}
                minimumNights={0}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
              />
              <input
                required
                className="book-guest"
                type="number"
                value={guests}
                placeholder="0"
                onChange={handleGuestsChange}
              />
            </div>

            <div className="book-cost-panel">
              <div className="book-price-row">
                <label className="book-price-att">EVENT PRICE:</label>
                <label className="book-price-val">1900</label>
              </div>
              <div className="book-price-row">
                <label className="book-price-att">FOODS PRICE:</label>
                <label className="book-price-val">1900</label>
              </div>
              <div className="book-price-row">
                <label className="book-price-att">SERVICES PRICE:</label>
                <label className="book-price-val">1900</label>
              </div>
              <div className="book-price-row">
                <label className="book-price-att">TOTAL COST:</label>
                <label className="book-price-val">1900</label>
              </div>
            </div>
            <button className="book-venue-btn" type="submit">
              BOOK NOW
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookVenue;
