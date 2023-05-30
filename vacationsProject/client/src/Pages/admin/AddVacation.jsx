import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import moment from 'moment';



const AddVacation = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user") === null || localStorage.getItem("user") !== "admin") {
            navigate('/login')
        }
    }, []);


    const [loginStatus, setLoginStatus] = useState("");
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [imageName, setImageName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = moment();
        const selectedStartDate = moment(startDate);
        const endDateMoment = moment(endDate);

        const positivePrice = 0;

        const maxPrice = 10000

        if (destination.trim() === '') {
            setLoginStatus('Please enter destination');
            return;
        }
        if (description.trim() === '') {
            setLoginStatus('Please enter description');
            return;
        }

        if (startDate.trim() === '') {
            setLoginStatus('Please enter start date');
            return;
        }
        if (selectedStartDate.isBefore(currentDate, 'day')) {
            setLoginStatus('Please select a start date that is after the current date.');
            return;
        }
        if (endDate.trim() === '') {
            setLoginStatus('Please enter end date');
            return;
        }
        if (endDateMoment.isSameOrBefore(selectedStartDate)) {
            setLoginStatus('Please select an end date that is after the start date.');
            return;
        }
        if (price < positivePrice) {
            setLoginStatus('price cannot be negative !');
            return;
        }
        if (price > maxPrice) {
            setLoginStatus('price need to be less then 10,000 !')
            return;
        }

        if (price.trim() === '') {
            setLoginStatus('Please enter price');
            return;
        }
        if (!imageName || imageName.length === "") {
            setLoginStatus('Please enter image file');
            return;
        }


        const formData = new FormData();
        formData.append('destination', destination);
        formData.append('description', description);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('price', price);
        formData.append('VacationImage', imageName);


        Axios.post('/addVacation', formData)
            .then(response => {
                navigate('/admin');
            })
            .catch(error => {
                console.error('Error inserting data', error);
            });

    };


    return (
        <div className="form-body-edit">
            <Navbar />
            <div className="row">
                <div className="form-holder">
                    <div className="form-content-vacations">
                        <div className="form-items-vacations">
                            <h3 className="text-white">Add Vacation</h3>
                            <p className="text-white">Fill in the data below.</p>
                            <form className="requires-validation" noValidate>
                                <div className="col-md-12 p-2">
                                    <input className="form-control" type="text" name="destination" placeholder="Destination" value={FormData.destination} onChange={(e) => setDestination(e.target.value)} required />
                                </div>
                                <div className="col-md-12 p-2">
                                    <textarea className="form-control" rows="3" placeholder="Description" name="description" value={FormData.description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>

                                <div className="col-md-12 p-2">
                                    <input className="form-control" type="date" name="startDate" placeholder="Start on" value={FormData.startDate} onChange={(e) => setStartDate(e.target.value)} required />

                                </div>
                                <div className="col-md-12 p-2">
                                    <input className="form-control" type="date" name="endDate" placeholder="end on" value={FormData.endDate} onChange={(e) => setEndDate(e.target.value)} required />

                                </div>
                                <div className="col-md-12 p-2">
                                    <input className="form-control" type="number" name="price" min="0" max="10000" placeholder="Price" value={FormData.price} onChange={(e) => setPrice(e.target.value)} required />

                                </div>
                                <div className="col-md-12 p-2">
                                    <input className="form-control" type="file" name="imageName" placeholder="Image" onChange={(e) => setImageName(e.target.files[0])} required />
                                </div>
                                {loginStatus && <p className="error">{loginStatus}</p>}

                                <div className="form-button mt-3">
                                    <button className="btn btn-primary button-update" onClick={handleSubmit}>Add Vacation</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVacation;
