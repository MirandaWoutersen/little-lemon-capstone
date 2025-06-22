import React, { useState } from "react";
import Button from "../Button/Button";
import "./BookingForm.css";

const BookingForm = ({
  onFormSubmit,
  isFormSubmitted,
  availableTimes,
  dispatchOnDateChange
}) => {
  const defaultTime = availableTimes[0];
  const minGuest = 1;
  const maxGuest = 10;
  const [formValues, setFormValues] = useState({
    date: "",
    time: defaultTime,
    people: "",
    occasion: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === 'date') {
      dispatchOnDateChange(e.target.value);
    }
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form data-testid="booking-form" onSubmit={(e) => onFormSubmit(e, formValues)}>
      <div className="reservation-container">
        <label htmlFor="date" className="containter-item-title">
          Date
        </label>
        <input
          data-testid="date"
          type="date"
          id="date"
          name="date"
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.date ? "error" : ""}
        />
      </div>
      <div className="reservation-container">
        <label htmlFor="time" className="containter-item-title">
          Time
        </label>
        <select
          data-testid="time"
          id="time"
          name="time"
          value={formValues.time}
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.time ? "error" : ""}
        >
          {availableTimes.map(time => 
            <option data-testid="booking-time-option" className="booking-time-option" key={time}>
              {time}
            </option>
          )}
        </select>
      </div>
      <div className="reservation-container">
        <label htmlFor="people" className="containter-item-title">
          Number of guests
        </label>
        <input
          data-testid="people"
          type="number"
          id="people"
          name="people"
          min={minGuest}
          max={maxGuest}
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.people ? "error" : ""}
        />
      </div>
      <div className="reservation-container">
        <label htmlFor="occasion" className="containter-item-title">
          Occasion
        </label>
        <select
          data-testid="occasion"
          id="occasion"
          name="occasion"
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.occasion ? "error" : ""}
        >
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Engagement</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="reservation-button">
        <Button title="Make your reservation" type="submit" />
      </div>
    </form>
  );
};

export default BookingForm;
