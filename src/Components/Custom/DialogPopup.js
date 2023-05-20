import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./dialogPopup.css";
import axios from "axios";

const DialogPopup = ({ booking, valid }) => {

  const handleConfirmation = async(e) => {
    console.log("Clicked?");
    try {
      const response = await axios.post('http://localhost:8081/api/venues/bookings', booking);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log("Booking Data: ", booking);

    // window.location.reload();
  }


  return(
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="book-venue-btn">Book Venue</button>
    </Dialog.Trigger>
    {valid && 
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Booking Details</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Review your selected event details before the confirmation.
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label">Event:</label>
          <label className="Label-Sub">{booking.venue}</label>
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label">Venue:</label>
          <label className="Label-Sub">{booking.venue}</label>
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label">Foods:</label>
          <label className="Label-Sub"></label>
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label">Services:</label>
          <label className="Label-Sub">{booking.venue}</label>
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label">Date:</label>
          <label className="Label-Sub">
            {booking.startDate} - {booking.endDate}
          </label>
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label">Guest:</label>
          <label className="Label-Sub">{booking.guests}</label>
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label">Total Price:</label>
          <label className="Label-Sub">{booking.totalCost}</label>
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 25, gap:"20px", justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className="Button blue">Update</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="Button green" onClick={handleConfirmation}>Confirm Booking</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
    }
  </Dialog.Root>
  );
};

export default DialogPopup;
