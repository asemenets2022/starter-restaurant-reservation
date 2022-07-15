import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservations } from "../utils/api";


export default function ReservationForm() {
    const history = useHistory();
    const [data, setFormData] = useState();

    const changeHandler = (event) => {
        setFormData({
            ...data,
            [event.target.name]: event.target.value,
        });
    }

    const submit = (event) => {
        event.preventDefault();
        submitHandler(data);
        setFormData({});
    }

    async function submitHandler(data) {
        const ac = new AbortController();
        try {
            await createReservations(data, ac.signal);
            history.push("/dashboard")
        } catch (error) {
            console.log(error);
        }
        return () => ac.abort();
    }

    function cancelHandler() {
        history.goBack();
    }

    return (
        <div>
            <h1>Create Reservation</h1>
            <form onSubmit={submit}>
                    <div className="row">
                    <div className="form-group col">
                        <label>First Name</label>
                        <input name="first_name" type="text" className="form-control" required="" placeholder="First Name" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group col">
                        <label>Last Name</label>
                        <input name="last_name" type="text" className="form-control" required="" placeholder="Last Name" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group col">
                        <label>Mobile Number</label>
                        <input name="mobile_number" type="text" className="form-control" required="" placeholder="Mobile Number" onChange={changeHandler}></input>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-group col">
                        <label>Date</label>
                        <input name="reservation_date" type="date" className="form-control" required="" placeholder="yyyy-mm-dd" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group col">
                        <label>Time</label>
                        <input name="reservation_time" type="time" className="form-control" required="" placeholder="--:-- --" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group col">
                        <label>People</label>
                        <input name="people" type="number" className="form-control" required="" onChange={changeHandler}></input>
                    </div>
                    </div>
                    <button className="btn btn-secondary mr-2 cancel" type="button" onClick={cancelHandler}>Cancel</button>
                    <button className="btn btn-primary" type="submit" onClick={submit}>Submit</button>
            </form>
        </div>
    )
}