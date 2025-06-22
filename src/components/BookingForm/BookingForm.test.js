import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

test('Renders BookingForm date label', () => {
  const mockOnFormSubmit = jest.fn();
  const mockDispatchOnDateChange = jest.fn();
  const availableTimes = ["12:00", "13:00", "14:00"];

  render(
    <BookingForm
      onFormSubmit={mockOnFormSubmit}
      isFormSubmitted={false}
      availableTimes={availableTimes}
      dispatchOnDateChange={mockDispatchOnDateChange}
    />
  );

  //Verify that the "Date" label is visible, as an indication that the component has been rendered
  const dateLabel = screen.getByText(/Date/i);
  expect(dateLabel).toBeInTheDocument();
});

test('Renders BookingForm initializeTimes with the right amount of items', async () => {
  const mockOnFormSubmit = jest.fn();
  const mockDispatchOnDateChange = jest.fn();
  const availableTimes = ["12:00", "13:00", "14:00"];

  render(
    <BookingForm
      onFormSubmit={mockOnFormSubmit}
      isFormSubmitted={false}
      availableTimes={availableTimes}
      dispatchOnDateChange={mockDispatchOnDateChange}
    />
  );

  const timeSelect = screen.getByTestId('time');
  const timeOptions = await screen.findAllByTestId('booking-time-option');
  expect(timeSelect).toBeInTheDocument();
  expect(timeSelect).toHaveAttribute('id', 'time');
  expect(timeOptions.length).toBe(3);
});

test('Renders BookingForm with initial time set', () => {
  const mockOnFormSubmit = jest.fn();
  const mockDispatchOnDateChange = jest.fn();
  const availableTimes = ["12:00", "13:00", "14:00"];

  render(
    <BookingForm
      onFormSubmit={mockOnFormSubmit}
      isFormSubmitted={false}
      availableTimes={availableTimes}
      dispatchOnDateChange={mockDispatchOnDateChange}
    />
  );

  const timeSelect = screen.getByTestId('time');
  expect(timeSelect.value).toBe("12:00");
});

test('Submits the form with user input', () => {
  const mockOnSubmit = jest.fn();
  const mockDispatchDateChange = jest.fn();
  const mockTimes = ['18:00', '19:00', '20:00'];

  render(
    <BookingForm
      onFormSubmit={mockOnSubmit}
      isFormSubmitted={false}
      availableTimes={mockTimes}
      dispatchOnDateChange={mockDispatchDateChange}
    />
  );

  // Fill in the form fields
  fireEvent.change(screen.getByTestId(/date/i), { target: { value: '2025-06-30' } });
  fireEvent.change(screen.getByTestId('time'), { target: { value: '19:00' } });
  fireEvent.change(screen.getByTestId(/people/i), { target: { value: '4' } });
  fireEvent.change(screen.getByTestId(/occasion/i), { target: { value: 'anniversary' } });

  // Submit the form
  fireEvent.submit(screen.getByTestId('booking-form'));

  // Assert submit handler is called
  expect(mockOnSubmit).toHaveBeenCalledTimes(1);

  // Check arguments passed to submit
  const [eventArg, formValuesArg] = mockOnSubmit.mock.calls[0];
  expect(formValuesArg).toEqual({
    date: '2025-06-30',
    time: '19:00',
    people: '4',
    occasion: 'anniversary',
  });
});

test('Should update available booking time options when changing booking date - Function updateTimes', async() => {
    const mockOnSubmit = jest.fn();
    const mockDispatchDateChange = jest.fn();
    const initialTimes = ['18:00', '19:00', '20:00'];
    const newTimesAfterDateChange = ['18:00', '18:30', '19:00', '19:30', '20:00'];

    // Keep track of the last rendered availableTimes
    let availableTimes = initialTimes;

    const { rerender } = render(
      <BookingForm
        onFormSubmit={mockOnSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchDateChange}
      />
    );

    // Check initial options are rendered
    expect(screen.getAllByTestId("booking-time-option").map(opt => opt.textContent)).toEqual(initialTimes);

    // Simulate date input change
    const dateToBeFilledIn = "2025-07-01";
    const dateInput = screen.getByTestId(/date/i);
    fireEvent.change(dateInput, { target: { name: "date", value: dateToBeFilledIn } });
    fireEvent.blur(dateInput);

    // Expect dispatch change date been called with filled in date and input field of form has filled in date
    expect(mockDispatchDateChange).toHaveBeenCalledWith(dateToBeFilledIn);
    expect(dateInput).toHaveValue(dateToBeFilledIn);

    // Simulate the parent updating availableTimes
    availableTimes = newTimesAfterDateChange;
    rerender(
      <BookingForm
        onFormSubmit={mockOnSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchDateChange}
      />
    );

    // Ensure options updated
    const updatedOptions = screen.getAllByTestId("booking-time-option").map(opt => opt.textContent);
    expect(updatedOptions).toEqual(newTimesAfterDateChange);
  });