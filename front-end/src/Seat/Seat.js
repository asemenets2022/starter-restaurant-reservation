import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {

const history = useHistory();
const { reservation_id } = useParams();
const [error, setError] = useState(null);
const [tables, setTables] = useState([]);
const [seatTable, setSeatTable] = useState(null);

useEffect(() => {
  async function loadTables() {
    const ac = new AbortController();
    setError(null);
    try {
      const response = await listTables(ac.signal);
      setTables((prev) => response);
    } catch (error) {
      setError(error);
    }
    return () => ac.abort();
  }
  loadTables();
}, [reservation_id]);

async function submitHandler(event) {
  event.preventDefault();
  const ac = new AbortController();
  try {
    const response = await seatReservation(
      seatTable,
      reservation_id,
      ac.signal
    );
    if (response) {
      history.push(`/dashboard`);
    }
  } catch (error) {
    setError(error);
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
      <ErrorAlert error={error} />
      <h3>{reservation_id}</h3>
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
                  value={JSON.stringify(table)}
                  required={true}
                >
                  {table.table_name} - {table.capacity}
                </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </form>
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
    </div>
  );
}
