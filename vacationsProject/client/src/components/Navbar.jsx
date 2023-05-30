import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false);
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        checkLoginStatus();
        checkAdmin();
    }, []);


    const checkLoginStatus = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setLoginStatus(true);
            setName(user);
        } else {
            setLoginStatus(false);
            setName('');
        }
    }

    const checkAdmin = () => {
        if (localStorage.getItem('user') == "admin") {
            setAdmin(true)
        }
    }

    let intervalId;

    const startInterval = () => {
        intervalId = setInterval(() => {
        }, 1000);
    }


    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        const userId = localStorage.getItem("user");
        setLoginStatus(false);
        setAdmin(false);
        checkLoginStatus(false);
        clearInterval(intervalId);



        await axios.post(`/logout?id=${userId}`)
            .then(response => {
                if (response.data.insertId === 0) {
                    setLoginStatus(false);
                }
                setAdmin(false);
                checkLoginStatus(false);
                navigate('/');
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="dy-navbar">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <div className="container">
                    <Link to="/" className="nav-link">
                        <div className="navbar-brand-logo-text">Vacation .app</div>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {!loginStatus && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link">Sign up</Link>
                                    </li>
                                </>
                            )}
                            {loginStatus && (
                                <>
                                    <li className="nav-item">
                                        <div className="nav-link name">Welcome {name} !</div>
                                    </li>
                                    {admin && (
                                        <li className="nav-item">
                                            <Link to="/adminPanel" className="nav-link">Admin panel</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button type="button" className="nav-link-logout btn btn-danger" onClick={() => handleLogout()}>logout</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
