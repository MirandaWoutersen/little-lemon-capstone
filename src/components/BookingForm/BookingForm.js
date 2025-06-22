import React, { useState, useEffect } from "react";
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
    date: new Date().toISOString().split('T')[0],
    time: defaultTime,
    people: 1,
    occasion: "birthday",
  });

  const [formValuesBlurred, setFormValuesBlurred] = useState({
    date: false,
    time: false,
    people: false,
    occasion: false,
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

  const handleInputBlur = (e) => {
    setFormValuesBlurred({
      ...formValuesBlurred,
      [e.target.name]: true,
    })
  }

  const isDateValid = () => formValues.date !== '';
  const isTimeValid = () => formValues.time !== '';
  const isPeopleFieldFilledIn = () => formValues.people !== '';
  const isPeopleValidNumber = () => parseInt(formValues.people, 10) >= minGuest && parseInt(formValues.people, 10) <= maxGuest;
  const isOccasionValid = () => formValues.occasion !== '';
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isDateValid() && isTimeValid() && isPeopleFieldFilledIn() && isPeopleValidNumber() && isOccasionValid());
  }, [formValues, formValuesBlurred]);

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
          value={formValues.date}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={true}
          className={(isFormSubmitted || formValuesBlurred.date) && !isDateValid() ? "error" : ""}
        />
      </div>
      {(isFormSubmitted || formValuesBlurred.date) && !isDateValid() && (
          <div className="error-message-container">
            <p className="error-message">Date is required</p>
          </div>
        )}
      <div className="reservation-container">
        <label htmlFor="time" className="containter-item-title">
          Time
        </label>
        <select
          data-testid="time"
          id="time"
          name="time"
          value={formValues.time}
          required={true}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={(isFormSubmitted || formValuesBlurred.time) && !isTimeValid ? "error" : ""}
        >
          {availableTimes.map(time =>
            <option data-testid="booking-time-option" className="booking-time-option" key={time}>
              {time}
            </option>
          )}
        </select>
      </div>
      {(isFormSubmitted || formValuesBlurred.time) && !isTimeValid && (
          <div className="error-message-container">
            <p className="error-message">Time is required</p>
          </div>
        )}
      <div className="reservation-container">
        <label htmlFor="people" className="containter-item-title">
          Number of guests
        </label>
        <input
          data-testid="people"
          type="number"
          id="people"
          name="people"
          value={formValues.people}
          min={minGuest}
          max={maxGuest}
          required={true}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={(isFormSubmitted || formValuesBlurred.people) && (!isPeopleFieldFilledIn() || !isPeopleValidNumber()) ? "error" : ""}
        />
      </div>
      {(isFormSubmitted || formValuesBlurred.people) && (!isPeopleFieldFilledIn() || !isPeopleValidNumber()) && (
          <div className="error-message-container">
            <p className="error-message">{!isPeopleFieldFilledIn() ? "Number of guests is required" : `Amount of guests must be between ${minGuest} and ${maxGuest}`}</p>
          </div>
        )}
      <div className="reservation-container">
        <label htmlFor="occasion" className="containter-item-title">
          Occasion
        </label>
        <select
          data-testid="occasion"
          id="occasion"
          name="occasion"
          value={formValues.occasion}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={true}
          className={(isFormSubmitted || formValuesBlurred.occasion) && !isOccasionValid ? "error" : ""}
        >
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Engagement</option>
          <option value="other">Other</option>
        </select>
      </div>
      {(isFormSubmitted || formValuesBlurred.occasion) && !isOccasionValid && (
          <div className="error-message-container">
            <p className="error-message">Occasion is required</p>
          </div>
        )}
      <div className="reservation-button">
        <Button
          aria-label="On Click"
          title="Make your reservation"
          type="submit"
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default BookingForm;
