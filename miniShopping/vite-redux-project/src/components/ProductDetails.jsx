import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const ProductDetails = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    const product = location.state.product;




    const addToCart = (product) => {
        dispatch(add(product))
    }

    return (
        <div className="container py-5">
            <div className="row py-4">
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                    <p className="py-5">
                        <NavLink to="/products" className="btn btn-dark"><FontAwesomeIcon icon={faArrowLeft} />Go To Shop</NavLink>
                    </p>

                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">
                        $ {product.price}
                    </h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={() => addToCart(product)}>
                        Add To Cart
                    </button>
                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                        Go To Cart
                    </NavLink>
                </div>
            </div>
        </div >
    );
};

export default ProductDetails;
