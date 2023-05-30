import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Navbar from "../../components/Navbar";
import moment from 'moment'


const Edit = () => {
    const [vacations, setVacations] = useState([])
    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [imageName, setImageName] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const { dataLocation } = location.state ? location.state : "";

    useEffect(() => {
        if (localStorage.getItem("user") === null || localStorage.getItem("user") !== "admin") {
            navigate('/login')
        }

        console.log(dataLocation)

        if (dataLocation !== undefined) {
            setDestination(dataLocation.destination)
            setDescription(dataLocation.description)
            const formattedStartDate = moment(dataLocation.startDate).format('YYYY-MM-DD');
            setStartDate(formattedStartDate);

            const formattedEndDate = moment(dataLocation.endDate).format('YYYY-MM-DD');
            setEndDate(formattedEndDate);
            console.log(endDate)
            setPrice(parseFloat(dataLocation.price.replace("$", "")))
        }
        getAllVacations();
    }, []);

    const getAllVacations = async () => {
        await Axios.get('/getAllVacations').then((response) => {
            setVacations(response.data)
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        const endDateMoment = moment(endDate);
        const id = dataLocation.vacID

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
        if (endDate.trim() === '') {
            setLoginStatus('Please enter end date');
            return;
        }
        if (endDateMoment.isBefore(startDate)) {
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

        const formData = new FormData();
        formData.append('destination', destination);
        formData.append('description', description);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('price', price);

        if (imageName !== dataLocation.imageName) {
            formData.append('VacationImage', imageName);
        }

        try {
            const response = await Axios.post(`/admin/edit/${id}`, formData).then((response) => {
                if (response.message) {
                    Axios.delete(`/deleteImage/${imageName}`)
                }
                navigate('/admin');
            })
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="container">
            <Navbar />
            <div className="form-body-edit">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content-vacations">
                            <div className="form-items-vacations">
                                <h3 className="text-white">Edit Vacation</h3>
                                <p className="text-white">Fill in the data below.</p>
                                <form className="requires-validation" noValidate>

                                    <div className="col-md-12 p-2">
                                        <input className="form-control" type="text" name="destination" value={destination} placeholder="Destination" onChange={(e) => setDestination(e.target.value)} required />
                                        <div className="valid-feedback">Destination field is valid!</div>
                                        <div className="invalid-feedback">Destination field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12 p-2">
                                        <textarea className="form-control card-text" rows="3" name="description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>

                                    <div className="col-md-12 p-2">
                                        <input className="form-control" type="date" name="startDate" value={startDate} placeholder="Start on" onChange={(e) => setStartDate(e.target.value)} required />
                                    </div>
                                    <div className="col-md-12 p-2">
                                        <input className="form-control" type="date" name="endDate" value={endDate} placeholder="end on" onChange={(e) => setEndDate(e.target.value)} required />
                                    </div>
                                    <div className="col-md-12 p-2">
                                        <input className="form-control" type="number" name="price" value={price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />

                                    </div>
                                    <div className="col-md-12 p-2">
                                        <input className="form-control" type="file" name="imageName" placeholder="Image" onChange={(e) => setImageName(e.target.files[0])} required />
                                    </div>

                                    {loginStatus && <p className="error">{loginStatus}</p>}

                                    <div className="form-button mt-3">
                                        <button id="submit" type="submit" className="btn btn-primary button-update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;

