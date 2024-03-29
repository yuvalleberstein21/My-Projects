import React from "react";
import image1 from "../assets/images/img1.jpg";
import image2 from "../assets/images/macbook-air.jpeg";
import image3 from "../assets/images/img3.jpg";
import image4 from "../assets/images/img4.jpg";
import image5 from "../assets/images/v872batch7-nunny-12.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div className="row py-5">
                <div className="mt-5 col-md-6 py-3">
                    <h1 className="home-title">My Mini Shopping By React | Redux</h1>
                    <div className="buttons d-flex justify-content-center mt-5 mb-3 pb-3">
                        <button className="btn btn-dark"><NavLink className="btn-home me-2" to="/products">GO SHOPPING</NavLink></button>
                    </div>
                </div>

                <div className="mt-5 col-md-6">
                    <div className="image-home-div">
                        <img src={image5} className="image-home" width="600px" height="400px" alt="image" />
                    </div>
                    {/* <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={image1} className="d-block w-100" alt="IPhone" height="500px" />
                            </div>
                            <div className="carousel-item">
                                <img src={image2} className="d-block w-100" alt="IPhone" height="500px" />
                            </div>
                            <div className="carousel-item">
                                <img src={image3} className="d-block w-100" alt="IPhone" height="500px" />
                            </div>
                            <div className="carousel-item">
                                <img src={image4} className="d-block w-100" alt="IPhone" height="500px" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> */}
                </div>

            </div>


        </>
    );
};

export default Home;
