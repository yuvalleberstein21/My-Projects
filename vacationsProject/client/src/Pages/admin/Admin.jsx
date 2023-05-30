import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import axios from "axios";
import AdminCards from "./AdminCards";
import MyToastContainer from "../../components/MyToastContainer";



const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        getAllVacations();
    }, []);


    const getAllVacations = async () => {
        await axios.get('/getAllVacations').then((response) => {
            if (localStorage.getItem("user") === null || localStorage.getItem("user") !== "admin") {
                navigate('/login')
            }
            else {
                localStorage.getItem('user');
                setVacations(response.data)
            }
        });
    }


    const deleteVacation = async (id, imageName) => {
        console.log(id)
        if (localStorage.getItem("user") === null || localStorage.getItem("user") !== "admin") {
            navigate('/login')
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let deleteVacations = await axios.get(`/deleteVacation?vacID=${id}&filename=${imageName}`);

                if (deleteVacations) {
                    getAllVacations();
                    Swal.fire(
                        'Deleted!',
                        'Vacation has been deleted.',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Not Deleted!',
                        'Vacation has been not deleted. please try again !',
                        'error'
                    )
                }
            }
        })
    }


    return (
        <>
            <section id="gallery">
                <Navbar />
                <MyToastContainer />
                <div className="container mt-5 p-5">
                    <div className="button-add">
                        <Link to="/addVacation"><button className="btn btn-add">Add vacation</button></Link>
                    </div>
                    <div className="row mt-5">
                        {vacations.map(vac => <AdminCards key={vac.vacID} deleteVacation={deleteVacation} ob={vac} />)}
                    </div>
                </div>
            </section>
        </>

    );
};

export default Admin;
