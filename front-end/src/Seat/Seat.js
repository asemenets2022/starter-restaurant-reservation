import React from "react";
import { useHistory, useParams } from "react-router-dom";

export default function Seat() {

const history = useHistory();
const { reservation_id } = useParams();

function cancelHandler() {
    history.goBack();
}

  return (
    <div>
      <h1>Seat Reservation</h1>
      <h3>{reservation_id}</h3>
      <form>
        <div className="row">
          <div className="form-group col">
            <label>
              Seat at:
              <select
                name="table_id"
                id="table_id"
                className="form-control"
              ></select>
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
