import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, readReservation, updateTableOnceSeated } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservationError, setReservationError] = useState(null);
  const [tableError, setTableError] = useState(null);
  const [tables, setTables] = useState([]);
  const [singleReservation, setSingleReservation] = useState([]);
  const [seatTable, setSeatTable] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    setReservationError(null);
    readReservation(reservation_id, ac.signal)
      .then(setSingleReservation)
      .catch(setReservationError);
    listTables(ac.signal).then(setTables).catch(setTableError);
  }, [reservation_id]);

  async function submitHandler(event) {
    event.preventDefault();
    const ac = new AbortController();
    try {
      const response = await updateTableOnceSeated(
        reservation_id,
        seatTable,
        ac.signal
      );
      if (response) {
        history.push(`/dashboard`);
      }

    } catch (error) {
      setTableError(error);
    }
    return () => ac.abort();
  }

  function cancelHandler() {
    history.goBack();
  }

  function changeHandler(event) {
    setSeatTable(event.target.value);
  }

  return (
    <div>
      <h1>Seat Reservation</h1>
      <ErrorAlert error={tableError} />
      <ErrorAlert error={reservationError} />
      <h3>
        #{reservation_id} - {singleReservation.first_name}{" "}
        {singleReservation.last_name} on {singleReservation.reservation_date} at{" "}
        {singleReservation.reservation_time} for {singleReservation.people}
      </h3>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="form-group col">
            <label>
              Seat at:
              <select
                name="table_id"
                id="table_id"
                className="form-control"
                onChange={changeHandler}
              >
                <option value=""> Table Name - Capacity </option>
                {tables.map((table) => (
                  <option
                    key={table.table_id}
                    value={table.table_id}
                    required={true}
                  >
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button
        className="btn btn-secondary mr-2 cancel"
        type="button"
        onClick={cancelHandler}
      >
        Cancel
      </button>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      </form>
    </div>
  );
}
