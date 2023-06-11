import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';




const Cart = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart);



    if (products.length === 0) {
        return <h3 className="d-flex justify-content-center mt-5">You'r cart is empty...</h3>
    }

    const removeToCart = (item) => {
        dispatch(remove(item));
    }

    return (
        <>


            <div className="container py-4">
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col-md-12" style={{ marginBottom: '10px' }}>
                            <MDBCard style={{ maxWidth: '100%', borderRadius: '10px' }}>
                                <MDBRow>
                                    <MDBCol md='4'>
                                        <MDBCardImage style={{ height: "250px", width: "400px" }} src={product.image} alt='...' fluid />
                                    </MDBCol>
                                    <MDBCol md='8'>
                                        <MDBCardBody>
                                            <MDBCardTitle>{product.title}</MDBCardTitle>
                                            <MDBCardText className="cart-description">
                                                {product.description}
                                            </MDBCardText>
                                            <MDBCardText className="fw-bold">{product.qty} X ${product.price} = $ {product.qty * product.price}</MDBCardText>
                                            <div className="d-flex justify-content-center">
                                                <Button variant="danger" onClick={() => removeToCart(product)}>Remove Item</Button>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
};

export default Cart;
