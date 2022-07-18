import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import {previous, next } from "../utils/date-time";
import ReservationsTable from "./ReservationsTable";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();


  useEffect(loadDashboard, [date]);


  //useEffect? needed 
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({date}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={handlePrev}>Previous</button>
        <button className="btn btn-secondary" onClick={handleToday}>Today</button>
        <button className="btn btn-secondary" onClick={handleNext}>Next</button>

      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationsTable reservations={reservations} loadDashboard={loadDashboard} />
    </main>
  );
}

export default Dashboard;
