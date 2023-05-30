import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Register() {

    Axios.defaults.withCredentials = true;

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState("");

    const navigate = useNavigate();



    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setLoginStatus('Please enter your name');
            return;
        }
        if (lastName.trim() === '') {
            setLoginStatus('Please enter your last name');
            return;
        }

        if (email.trim() === '') {
            setLoginStatus('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLoginStatus('Please enter a valid email');
            return;
        }

        if (password.trim() === '') {
            setLoginStatus('Please enter your password');
            return;
        }
        if (password.trim().length < 4) {
            setLoginStatus('Password must be at least 4 characters long');
            return;
        }


        Axios.post('/register', {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
                console.log(response)
            }
            else {
                console.log(response)
                localStorage.setItem('user', name)
                localStorage.setItem('userId', response.data.userId);
                navigate('/vacations')
                toast.success('Welcome ' + name, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }


    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Register</h3>
                            <p>Fill in the data below.</p>
                            <form className="requires-validation" noValidate>
                                <div className="col-md-12">
                                    <input className="form-control" type="text" name="name" placeholder="First Name" onChange={handleChangeName} required />
                                    <div className="valid-feedback">Name field is valid!</div>
                                    <div className="invalid-feedback">Name field cannot be blank!</div>
                                </div>
                                <div className="col-md-12">
                                    <input className="form-control" type="text" name="lastName" placeholder="Last Name" onChange={handleChangeLastName} required />
                                    <div className="valid-feedback">Last name is valid!</div>
                                    <div className="invalid-feedback">Last name field cannot be blank!</div>
                                </div>
                                <div className="col-md-12">
                                    <input className="form-control" type="email" name="email" placeholder="E-mail Address" onChange={handleChangeEmail} required />
                                    <div className="valid-feedback">Email field is valid!</div>
                                    <div className="invalid-feedback">Email field cannot be blank!</div>
                                </div>
                                <div className="col-md-12">
                                    <input className="form-control" type="password" name="password" minLength={4} placeholder="Password" onChange={handleChangePassword} required />
                                    <div className="valid-feedback">Password field is valid!</div>
                                    <div className="invalid-feedback">Password field cannot be blank!</div>
                                </div>
                                {loginStatus && <p className="error">{loginStatus}</p>}
                                <div className="mt-2 ml-4">
                                    <span>Do you have an account? <Link className="link" to="/login">Login Here</Link></span>
                                </div>
                                <div className="form-button mt-3">
                                    <button className="btn btn-primary" onClick={handleSubmit} noValidate>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Register;
