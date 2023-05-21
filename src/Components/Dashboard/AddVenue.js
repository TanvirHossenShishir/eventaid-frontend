import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./manageVenues.css";
import axios from "axios";

const AddVenue = ({ venueData, editable, update }) => {
  const createEvent = (venue, foodList, eventList, userId) => {
    const url = "http://localhost:8081/api/venues/events";
    const data = {
      userId: parseInt(userId),
      venueDto: venue,
      foodorServicesList: foodList,
      eventDtoList: eventList,
    };
    console.log("Data after update: ", data);
    if (update) {
      axios
        .post(`http://localhost:8081/api/venues/events/${venueData.id}`, data)
        .then((resp) => {
          console.log(resp.data);
        });
    }
    else{
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  };

  // venue details
  const [formData, setFormData] = useState({
    venueName: venueData.venueName,
    place: venueData.place,
    contact: venueData.contact,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // event details
  const [showEventForm, setShowEventForm] = useState(false);

  const [eventData, setEventData] = useState({
    eventName: "",
    eventCost: "",
  });

  const handleEventChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventData({ ...eventData, [name]: value });
  };

  const [submittedEventData, setSubmittedEventData] = useState(
    venueData.events
  );

  const handleEventSubmit = () => {
    if (eventData.eventName === "" || eventData.eventCost === "") return;
    setSubmittedEventData([...submittedEventData, eventData]);
    setEventData({ eventName: "", eventCost: "" });
    setShowEventForm(false);
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
    setEventData({ eventName: "", eventCost: "" });
  };

  const handleEventUpdate = (index) => {
    const selectedEventData = submittedEventData[index];

    setEventData(selectedEventData);
    setShowEventForm(true);

    const newEventData = [...submittedEventData];
    newEventData.splice(index, 1);
    setSubmittedEventData(newEventData);
  };

  const handleEventDelete = (index) => {
    const newEventData = [...submittedEventData];
    newEventData.splice(index, 1);
    setSubmittedEventData(newEventData);
  };

  // equipments data
  const [showServiceForm, setShowServiceForm] = useState(false);
  
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    serviceCost: "",
    what: "",
  });
  
  const handleServiceChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setServiceData({ ...serviceData, [name]: value });
  };
  
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.id);
    setServiceData({ ...serviceData, what: e.target.id });
  };

  const [submittedServiceData, setSubmittedServiceData] = useState(
    venueData.foods
  );

  const handleServiceSubmit = () => {
    if (serviceData.serviceName === "" || serviceData.eventCost === "") return;
    setSubmittedServiceData([...submittedServiceData, serviceData]);
    setServiceData({ serviceName: "", serviceCost: "", what: "" });
    setSelectedType("");
    setShowServiceForm(false);
  };

  const handleAddService = () => {
    setShowServiceForm(true);
    setServiceData({ serviceName: "", serviceCost: "", what: "" });
  };

  const handleServiceUpdate = (index) => {
    const selectedServiceData = submittedServiceData[index];

    setServiceData(selectedServiceData);
    setSelectedType(selectedServiceData.what);
    console.log(selectedServiceData);
    setShowServiceForm(true);

    const newServiceData = [...submittedServiceData];
    newServiceData.splice(index, 1);
    setSubmittedServiceData(newServiceData);
  };

  const handleServiceDelete = (index) => {
    const newServiceData = [...submittedServiceData];
    newServiceData.splice(index, 1);
    setSubmittedServiceData(newServiceData);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (formData.venueName && formData.place && formData.contact) {
      const userId = JSON.parse(window.localStorage.getItem("userdata")).id;
      createEvent(formData, submittedServiceData, submittedEventData, userId);
      navigate("/");
      window.location.reload(false);
    } else {
      alert("Insert all the required information before saving.");
    }
  };

  return (
    <div className="add-venue-container">
      <label className="manage-venue-title">VENUE DETAILS</label>

      <input
        className="venue-input"
        type="text"
        placeholder="Name"
        name="venueName"
        value={formData.venueName}
        onChange={handleChange}
        autoComplete="off"
        disabled={editable ? "" : "disabled"}
        required
      />
      <input
        className="venue-input"
        type="text"
        placeholder="Place"
        name="place"
        value={formData.place}
        onChange={handleChange}
        autoComplete="off"
        disabled={editable ? "" : "disabled"}
        required
      />
      <input
        className="venue-input"
        type="tel"
        placeholder="Contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        autoComplete="off"
        disabled={editable ? "" : "disabled"}
        required
      />

      {/* ------------Event Details------------- */}
      <label className="venue-info">EVENTS:</label>
      {submittedEventData.map((data, index) => (
        <div key={index} className="option-row">
          <div className="add-venue-att">{data.eventName}</div>
          <div className="info-sec">
            <div className="add-venue-val">{data.eventCost} BDT</div>

            {editable && (
              <>
                <button
                  className="option-btn"
                  onClick={() => handleEventUpdate(index)}
                >
                  Update
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleEventDelete(index)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {showEventForm && (
        <div className="add-events-section">
          <input
            className="event-input"
            type="text"
            placeholder="Name"
            name="eventName"
            value={eventData.eventName}
            onChange={handleEventChange}
            autoComplete="off"
          />
          <input
            className="event-input"
            type="number"
            placeholder="Price"
            name="eventCost"
            value={eventData.eventCost}
            onChange={handleEventChange}
            autoComplete="off"
          />
          <button className="submit-evt-btn" onClick={handleEventSubmit}>
            Submit
          </button>
        </div>
      )}

      {editable && (
        <div className="add-events-section">
          <button className="add-events-btn" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      )}

      {/* ------------Food and Services------------- */}
      <label className="venue-info">FOODS & SERVICES:</label>
      {submittedServiceData.map((data, index) => (
        <div key={index} className="option-row">
          <div className="add-venue-att pre-cont">
            <div className="pre-att">{data.what}:</div>
            {data.serviceName}
          </div>
          <div className="info-sec">
            <div className="add-venue-val">{data.serviceCost} BDT</div>

            {editable && (
              <>
                <button
                  className="option-btn"
                  onClick={() => handleServiceUpdate(index)}
                >
                  Update
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleServiceDelete(index)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {showServiceForm && (
        <div className="add-events-section">
          <input
            className="service-input"
            type="text"
            placeholder="Name"
            name="serviceName"
            value={serviceData.serviceName}
            onChange={handleServiceChange}
            autoComplete="off"
          />
          <input
            className="service-input fix-price-width"
            type="number"
            placeholder="Price"
            name="serviceCost"
            value={serviceData.serviceCost}
            onChange={handleServiceChange}
            autoComplete="off"
          />

          <div className="wrapper">
            <input
              type="radio"
              name="select"
              id="food"
              checked={selectedType === "food"}
              onChange={handleTypeChange}
            />
            <input
              type="radio"
              name="select"
              id="service"
              checked={selectedType === "service"}
              onChange={handleTypeChange}
            />
            <label htmlFor="food" className="option food">
              <div className="dot"></div>
              <span>Food</span>
            </label>
            <label htmlFor="service" className="option service">
              <div className="dot"></div>
              <span>Service</span>
            </label>
          </div>

          <button className="submit-evt-btn" onClick={handleServiceSubmit}>
            Submit
          </button>
        </div>
      )}

      {editable && (
        <>
          <div className="add-events-section">
            <button className="add-events-btn" onClick={handleAddService}>
              Add Food/Service
            </button>
          </div>

          <button className="save-venue-btn" onClick={handleSubmit}>
            SAVE VENUE
          </button>
        </>
      )}
    </div>
  );
};

export default AddVenue;
