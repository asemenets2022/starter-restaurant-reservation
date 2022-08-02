import React, { useState, useEffect } from "react";
import { readReservation, updateReservation } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "../CreateReservation/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation() {
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
    const [error, setError] = useState(null);
    const { reservation_id } = useParams();

    useEffect(() => {
        const ac = new AbortController();
        readReservation(reservation_id, ac.signal)
        .then((response) => {
            setFormData({
                ...response 
            })
        })
        .catch(setError);
    }, [reservation_id]);

    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    function cancelHandler() {
        history.goBack();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const ac = new AbortController();
            setError(null);
            await updateReservation({
                ...formData, people: Number(formData.people )
            }, ac.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
            return () => ac.abort();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div>
            <ErrorAlert error={error} />
            <ReservationForm formData={formData} changeHandler={changeHandler} handleSubmit={handleSubmit} cancelHandler={cancelHandler}/>
        </div>
    )
}