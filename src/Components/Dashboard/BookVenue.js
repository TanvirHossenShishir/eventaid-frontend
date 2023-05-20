import React, { useState, useEffect } from "react";
import "./bookVenue.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import DialogPopup from "../Custom/DialogPopup";

const BookVenue = () => {
  const [place, setPlace] = useState("");
  const [venue, setVenue] = useState("");
  const [event, setEvent] = useState("");
  const [guests, setGuests] = useState(0);
  const [food, setFood] = useState([]);
  const [service, setService] = useState([]);

  const [eventCost, setEventCost] = useState(0);
  const [foodCost, setFoodCost] = useState(0);
  const [serviceCost, setServiceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [venueId,setVenueId]=useState(0);
  const [focusedInput, setFocusedInput] = useState(null);
  
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const [places, setPlaces] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/venues/places`)
      .then((resp) => {
        console.log(resp.data);
        let result = resp.data;
        setPlaces(result);
      });
  }, []);
  
  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
    setVenue("");
    setEvent("");
    setFood([]);
    setService([]);

    axios
      .get(`http://localhost:8081/api/venues/all/${e.target.value}`)
      .then((resp) => {
        console.log(resp.data);
        let result = resp.data;
        setVenues(result);
      });
  };

  const foodOptions = venues
    .filter((venue_) => venue_.venueName === venue)
    .map((venue_) =>
      venue_.foods.map(({ id,serviceName, serviceCost }) => ({
        id:`${id}`,
        label: `${serviceName}: ${serviceCost}/-`,
        value: serviceName,
      }))
    )
    .flat();

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
    setEvent("");
    setFood([]);
    setService([]);
  };

  const filteredEvents = venue
    ? venues.find((v) => v.venueName === venue).events
    : [];

  useEffect(() => {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    const diffInDays = moment.duration(endMoment.diff(startMoment)).asDays();

    console.log("diff: ", diffInDays);

    let sev = event;
    let selectedEvent = filteredEvents.find((event) => event.eventName === sev);
    let eventCost = selectedEvent ? selectedEvent.eventCost : 0;

    let foodCost = food.reduce(
      (total, option) =>
        total +
        venues
          .find((v) => v.venueName === venue)
          .foods.find((f) => f.serviceName === option.value).serviceCost,
      0
    );
    let serviceCost = service.reduce(
      (total, option) =>
        total +
        venues
          .find((v) => v.venueName === venue)
          .foods.find((f) => f.serviceName === option.value).serviceCost,
      0
    );
    eventCost = parseInt(eventCost);
    foodCost = parseInt(foodCost);
    foodCost = guests > 0 ? foodCost * guests : foodCost;
    serviceCost = parseInt(serviceCost);
    let totalCost = eventCost + foodCost + serviceCost;
    
    setEventCost(eventCost);
    setFoodCost(foodCost);
    setServiceCost(serviceCost);
    setTotalCost(totalCost);
  }, [guests, event, food, service, startDate, endDate]);

  
  const handleEventChange = (e) => {
    const selectedEvent = filteredEvents.find(
      (event) => event.eventName === e.target.value
    );
    setEvent(e.target.value);
    setEventCost(selectedEvent ? selectedEvent.eventCost : 0);
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

  const [isValid, setIsValid] = useState(false);
  const [booking, setBooking] = useState({});

  const handleSubmit = async(e) => {
    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
    e.preventDefault();


    let sev = venue;
    let selectedVenue = venues.find((venue) => venue.venueName === sev);
    let vID = selectedVenue ? selectedVenue.id : 0;

    sev = event;
    let selectedEvent = filteredEvents.find((event) => event.eventName === sev);
    console.log("sel event: ", selectedEvent);
    let eID = selectedEvent ? selectedEvent.id : 0;

    console.log(place+venue+event+food+service+startDate+endDate);
    console.log(typeof(food))
    food.map((fo)=>console.log(fo.id))
    const bookingObj = {
      place: place,
      venueId: vID,
      eventId: eID,
      guests: parseInt(guests),
      foodIds: food.map((fo) => fo.id),
      serviceIds: service.map((se) => se.id),
      eventCost: eventCost,
      foodCost: foodCost,
      serviceCost: serviceCost,
      totalCost: totalCost,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      userId: JSON.parse(window.localStorage.getItem("userdata")).id,
      status:"pending"
    };
    console.log(bookingObj);

    setBooking(bookingObj);
    
    // try {
    //   const response = await axios.post('http://localhost:8081/api/venues/bookings', bookingObj);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }


    // window.location.reload();
    if(place && venue && event && guests && startDate && endDate)
      setIsValid(true);
  };

  return (
    <div className="book-venue-container">
      <form onSubmit={handleSubmit}>
        <div className="book-form-con">
          <div className="book-side-con">
            <label className="manage-venue-title">BOOK EVENT</label>
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
              {places.map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))}
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
              {venues.map((venue, index) => (
                <option key={index} value={venue.venueName}>
                  {venue.venueName}
                </option>
              ))}
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
              {filteredEvents.map((event, index) => (
                <option key={index} value={`${event.eventName}`}>
                  {`${event.eventName}: ${event.eventCost}/-`}
                </option>
              ))}
            </select>

            <label className="book-info">FOODS:</label>
            <div className="book-mul-sel">
              <MultiSelect
                options={foodOptions}
                value={food}
                onChange={handleFoodChange}
                labelledBy="Select"
              />
            </div>

            <label className="book-info">SERVICES:</label>
            <MultiSelect
              options={foodOptions}
              value={service}
              onChange={handleServiceChange}
              labelledBy="Select"
            />
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
                <label className="book-price-val">{eventCost}/-</label>
              </div>
              <div className="book-price-row">
                <label className="book-price-att">FOODS PRICE:</label>
                <label className="book-price-val">{foodCost}/-</label>
              </div>
              <div className="book-price-row hl">
                <label className="book-price-att">SERVICES PRICE:</label>
                <label className="book-price-val">{serviceCost}/-</label>
              </div>
              <div className="book-price-row">
                <label className="book-price-att">TOTAL COST:</label>
                <label className="book-price-val">{totalCost}/-</label>
              </div>
            </div>
            {/* <button className="book-venue-btn" type="submit">
              BOOK NOW
            </button> */}

            <div onClick={handleSubmit}>
              <DialogPopup booking={booking} valid={isValid} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookVenue;
