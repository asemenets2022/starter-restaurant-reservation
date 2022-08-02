import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservations } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function CreateReservation() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState({...initialFormState});
    const [reservationsError, setReservationsError] = useState(null);

    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setReservationsError(null);
            const response = await createReservations({...formData, people: Number(formData.people)});
            const date = response.reservation_date;
            history.push(`/dashboard?date=${date}`)
        } catch (error) {
            setReservationsError(error);
            console.log(error);
        };
        }

    function cancelHandler() {
        history.goBack();
    }

    return (
        <div>
            <ErrorAlert error={reservationsError} />
            <ReservationForm formData={formData} changeHandler={changeHandler} handleSubmit={handleSubmit} cancelHandler={cancelHandler} />
        </div>
    )
}