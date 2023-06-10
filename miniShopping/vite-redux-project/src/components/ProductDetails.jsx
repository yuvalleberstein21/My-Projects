import React from "react";
import { useLocation } from 'react-router-dom';
import { getProducts } from "../store/productSlice"
import Button from '@mui/joy/Button';;
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol

} from 'mdb-react-ui-kit';
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const ProductDetails = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    const product = location.state.product;


    const addToCart = (product) => {
        dispatch(add(product))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <MDBCard style={{ maxWidth: '800px' }}>
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage src={product.image} alt='...' fluid />
                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardBody>
                                    <MDBCardTitle>{product.title}</MDBCardTitle>
                                    <MDBCardText>
                                        {product.description}
                                    </MDBCardText>
                                    <MDBCardText>
                                        <span className='text-muted'>{product.price} $</span>
                                    </MDBCardText>
                                    <Button onClick={() => addToCart(product)}>Add To Cart</Button>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
