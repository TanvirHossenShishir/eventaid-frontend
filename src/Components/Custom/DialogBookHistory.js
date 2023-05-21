import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./dialogPopup.css";
import axios from "axios";
import "../Dashboard/bookingHistory.css";

const DialogBookHistory = ({ booking, handleRender }) => {
  const handleConfirmation = async (e) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/venues/bookings/${booking.id}`);
      console.log(response.data);
      handleRender(true);
    } catch (error) {
      console.log(error);
    }
  };

  const startDate = new Date(
    booking.startDate[0],
    booking.startDate[1] - 1,
    booking.startDate[2]
  );
  const endDate = new Date(
    booking.endDate[0],
    booking.endDate[1] - 1,
    booking.endDate[2]
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="book-history-row">
          <label className="b-h-date b-r-frmt brdr-left">
            {startDate.toLocaleDateString()}
          </label>
          <label className="b-h-event b-r-frmt">
            {booking.event.eventName}
          </label>
          <label className="b-h-venue b-r-frmt">
            {booking.venue.venueName}
          </label>
          <label className="b-h-total b-r-frmt">{booking.totalCost}/-</label>
          <label className="b-h-status b-r-frmt brdr-right">Pending</label>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Booking Details</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Review your booking status.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label">Event:</label>
            <label className="Label-Sub">{booking.event.eventName}</label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label">Venue:</label>
            <label className="Label-Sub">
              {booking.venue.venueName}, {booking.venue.place}
            </label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label">Foods:</label>
            <label className="Label-Sub">
              {booking.food.map((food) => food.serviceName).join(", ")}
            </label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label">Services:</label>
            <label className="Label-Sub">
              {booking.food.map((service) => service.serviceName).join(", ")}
            </label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label">Date:</label>
            <label className="Label-Sub">
              {startDate.toLocaleDateString("en-GB")} -{" "}
              {endDate.toLocaleDateString("en-GB")}
            </label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label">Guest:</label>
            <label className="Label-Sub">{booking.guests}</label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label">Total Price:</label>
            <label className="Label-Sub">{booking.totalCost}/-</label>
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              gap: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button blue" onClick={handleConfirmation}>
                Cancel Booking
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogBookHistory;
