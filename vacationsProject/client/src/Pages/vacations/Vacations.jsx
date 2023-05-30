import React, { useEffect, useState } from "react";
import '../../App.css'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import VacationsCard from "./VacationsCard";
import axios from "axios";
import FiltersFavorite from "./FiltersFavorite";
import FiltersActiveFavcations from "./FiltersActiveFavcations";
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import MyToastContainer from "../../components/MyToastContainer";




const Vacations = () => {

    const navigate = useNavigate();

    const [favorites, setFavorites] = useState({})
    const [showFutureOnly, setShowFutureOnly] = useState(false);
    const [showFollowed, setShowFollowed] = useState(false);
    const [showActive, setActiveVacations] = useState(false);
    const [filterVacations, setFilterVacations] = useState([]);
    const [vacations, setVacations] = useState([]);
    const [Followers, setFollower] = useState([]);


    axios.defaults.withCredentials = true;


    useEffect(() => {
        checkUserStatus();
        getUsersFollowers();
        getFollowers();
        filterVacation();
    }, []);


    const checkUserStatus = () => {
        if (localStorage.getItem("user") === null || localStorage.getItem("user") === "admin") {
            navigate('/login')
        }
    }


    const iconCliked = (id) => {
        const userId = localStorage.getItem("userId");
        const vacID = id;

        axios.get(`/followVacation?id=${userId}&vacID=${vacID}`)
            .then((response) => {
                if (response.data.message === "User followed vacation successfully") {
                    setFavorites({ ...favorites, [id]: true })
                    getUsersFollowers(vacID);
                    getFollowers(vacID)
                    isVacationFollowed(vacID)
                } else if (response.data.message === "User unfollowed vacation successfully") {
                    axios.delete(`/delete?userID=${userId}&vacationsID=${vacID}`)
                        .then((response) => {
                            setFavorites({ ...favorites, [id]: false })
                            getUsersFollowers(vacID);
                            getFollowers(vacID)
                            isVacationFollowed(vacID)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getUsersFollowers = async () => {
        const userID = localStorage.getItem("userId");
        const response = await axios.get(`/getUsersFollowers?id=${userID}`);
        setVacations(response.data.vacations);
    };


    const isVacationFollowed = (vacationId) => {
        const vacation = vacations.find(v => v.vacID === vacationId);
        return vacation ? vacation.isFollow : false;
    };

    const getFollowers = async () => {
        await axios.get('/adminPanelFollowers').then((response) => {
            setFollower(response.data)
        });
    }
    const checkCount = (vacationID) => {
        const check = Followers.find(v => v.vacID === vacationID);
        return check ? check.followers_count : 0;
    };


    const filterVacation = async () => {
        await axios.get('/filterVacations').then((response) => {
            setFilterVacations(response.data)

        })
    }

    const filteredVacations = showFutureOnly
        ? filterVacations.filter(vacation => new Date(vacation.startDate) > new Date())
        : filterVacations;

    const filteredActiveVacations = showActive
        ? filterVacations.filter(vacation => moment(vacation.startDate).isSame(moment(), 'day'))
        : filterVacations;


    const filteredFavoriteVacations = showFollowed ? vacations.filter(v => v.isFollow) : vacations;


    const handleCheckboxChange = event => {
        setShowFutureOnly(event.target.checked);
    };
    const handleShowFollowedChange = (event) => {
        setShowFollowed(event.target.checked);
    };
    const handleShowActiveVacations = (event) => {
        setActiveVacations(event.target.checked);
    };



    return (
        <>
            <section id="gallery">
                <Navbar />
                <MyToastContainer />
                <div className="container mt-5 p-5">

                    <div className="row">

                        <div className="col-md-4">
                            <label className='t5'>
                                <span className='text'>Future Vacations</span>
                                <span className="material-symbols-outlined">
                                    connecting_airports
                                </span>
                                <input checked={showFutureOnly} type='checkbox' onChange={handleCheckboxChange} />
                                <span className='value'></span>
                            </label>
                        </div>
                        <div className="col-md-4">
                            <label className='t5 favoritesCheckbox'>
                                <span className='text'>My favorites Vacations</span>
                                <span className="material-symbols-outlined">
                                    connecting_airports
                                </span>
                                <input checked={showFollowed} type='checkbox' onChange={handleShowFollowedChange} />
                                <span className='value'></span>
                            </label>
                        </div>
                        <div className="col-md-4">
                            <label className='t5 favoritesCheckbox'>
                                <span className='text'>Active Vacations</span>
                                <span className="material-symbols-outlined">
                                    connecting_airports
                                </span>
                                <input checked={showActive} type='checkbox' onChange={handleShowActiveVacations} />
                                <span className='value'></span>
                            </label>
                        </div>
                    </div>

                    <div className="row mt-5">
                        {showFollowed ? (
                            filteredFavoriteVacations.map(vacation => (
                                <FiltersFavorite
                                    key={vacation.vacID}
                                    ob={vacation}
                                    favorite={favorites}
                                    isVacationFollowed={isVacationFollowed}
                                    checkCount={checkCount}
                                    iconCliked={iconCliked}
                                />
                            ))
                        ) : showActive ? (
                            filteredActiveVacations.map(vacation => (
                                <FiltersActiveFavcations
                                    key={vacation.vacID}
                                    ob={vacation}
                                    favorite={favorites}
                                    isVacationFollowed={isVacationFollowed}
                                    checkCount={checkCount}
                                    iconCliked={iconCliked}
                                />
                            ))
                        ) : (
                            filteredVacations.map(vacation => (
                                <VacationsCard
                                    key={vacation.vacID}
                                    favorite={favorites}
                                    isVacationFollowed={isVacationFollowed}
                                    checkCount={checkCount}
                                    iconCliked={iconCliked}
                                    ob={vacation}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>

    );
};

export default Vacations;
