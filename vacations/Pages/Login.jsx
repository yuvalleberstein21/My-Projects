import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyToastContainer from "../components/MyToastContainer";
import Vacations from "./Vacations";





function Login() {

    Axios.defaults.withCredentials = true;
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [successMessage, setSuccessMessage] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('/login').then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].email)
            }
        })
    }, []);


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

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

        Axios.post('/login', {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)

            } else if (response.data[0].role == "admin") {
                localStorage.setItem('user', response.data[0].role)
                navigate('/admin')
                toast.success('Welcome back ' + response.data[0].name);
            }
            else {
                dispatch({
                    type: "SetUsers",
                    payload: response.data
                })

                localStorage.setItem('user', response.data[0].name)
                localStorage.setItem('userId', response.data[0].id)

                navigate('/vacations');

                toast.success('Welcome back ' + response.data[0].name);
            }
        }).catch((error) => {
            setLoginStatus(error)
        })
    }



    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Login</h3>
                            <p>Fill in the data below.</p>

                            <form className="requires-validation" noValidate>

                                <div className="col-md-12">
                                    <input className="form-control" type="email" name="email" value={email} placeholder="E-mail Address" onChange={handleEmailChange} required />

                                </div>
                                <div className="col-md-12">
                                    <input className="form-control" type="password" name="password" value={password} placeholder="Password" onChange={handlePasswordChange} required />

                                </div>
                                {loginStatus && <p className="error">{loginStatus}</p>}
                                <div className="mt-2 ml-3">
                                    <span>Don't you have an account? <Link className="link" to="/register">Register Here</Link></span>
                                </div>
                                <div className="form-button mt-3">
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;
