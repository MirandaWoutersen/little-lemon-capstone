import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI, submitAPI } from "../../../utils/Api";
import "./Reservations.css";
import BookingForm from "../../BookingForm/BookingForm";

const Reservations = () => {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const submitForm = (e, formData) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    // const areAllFieldsFilled = Object.values(formValues).every(
    //   (value) => value
    // );
    const response = submitAPI(formData);
    if (response) navigate("/confirmed-booking");
  };

  const updateTimes = (availableTimes, date) => {
    const response = fetchAPI(new Date(date));
    return response.length !== 0 ? response : availableTimes;
  };

  const initializeTimes = (initialAvailableTimes) => [
    ...initialAvailableTimes,
    ...fetchAPI(new Date()),
  ];

  const [availableTimes, dispatchOnDateChange] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <div data-testid="reservations-component" className="reservation">
      <div className="reservation-card">
        <h1 className="reservation-title">Table reservation</h1>
        <BookingForm
          availableTimes={availableTimes}
          dispatchOnDateChange={dispatchOnDateChange}
          onFormSubmit={submitForm}
          isFormSubmitted={isFormSubmitted}
        />
      </div>
    </div>
  );
};

export default Reservations;
