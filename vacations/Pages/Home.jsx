import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        checkLoginStatus();
    }, []);


    const checkLoginStatus = () => {
        if (localStorage.getItem('user') === null) {
            setUser(null)
        }
    }
    return (
        <div className="fluid mt-5">
            <div className="container">

                <div className="home-title">
                    {/* <h1 className="h1-home">My Travel Website </h1> */}
                    <h1>
                        <span className="span-home">Welcome, </span>
                        <span className="span-home">Do</span>
                        <span className="span-home">you</span>
                        <span className="span-home">already</span>
                        <span className="span-home">know</span>
                        <span className="span-home">what</span>
                        <span className="span-home">your</span>
                        <span className="span-home">next</span>
                        <span className="span-home">desitnation</span>
                        <span className="span-home">is ?</span>
                        <span className="span-home">Let's</span>
                        <span className="span-home">start</span>
                        <span className="span-home">choosing</span>
                        <span className="span-home">the</span>
                        <span className="span-home">vacation</span>
                        <span className="span-home">that</span>
                        <span className="span-home">suits</span>
                        <span className="span-home">you.</span>

                        <div className="buttons-home">
                            <span className="btn btn-success btn-home span-home">Login</span>
                            <span className="btn btn-success btn-home span-home">Reigster</span>
                        </div>
                    </h1>
                </div>

            </div>
        </div>
    );
};

export default Home;

