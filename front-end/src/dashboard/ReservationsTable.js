import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import loadDashboard from   "./Dashboard";

export default function ReservationsTable({reservations, loadDashboard}) {
    const [error, setError] = useState(null);
    const reservationsTableRows = reservations.map((reservation) => {
        return (
            <tr key={reservation.reservation_id}>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.people}</td>
            </tr>
        );
      });

    return (
        <div> 
            <ErrorAlert error={error} />
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>PEOPLE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>{reservationsTableRows}</tbody>
            </table>
        </div>
    );
}

