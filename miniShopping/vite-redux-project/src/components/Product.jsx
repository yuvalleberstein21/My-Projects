import { useState, useEffect } from "react";
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button'
// import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from "../store/productSlice";
import statusCode from "../utils/statusCode";
import { MDBSpinner } from 'mdb-react-ui-kit';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';





const Product = () => {

    const dispatch = useDispatch()
    const { data: products, status } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, []);



    if (status === statusCode.ERROR) {
        return <Alert key="danger" variant="danger">Something went wrong ! Please try again later..</Alert>
    }

    const addToCart = (product) => {
        dispatch(add(product))
    }


    return (
        <>
            <h1 className="d-flex justify-content-center align-items-center title mt-3">Our Products</h1>

            <div className="align-items-center d-flex justify-content-center loading">
                {status === statusCode.LOADING &&
                    <MDBSpinner className="mdb-spinner" role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>


                }
            </div>

            <div className="row mt-5">
                {products.map(product => (
                    <div key={product.id} className="col-md-3" style={{ marginBottom: '25px' }}>
                        <Card className="h-100" sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
                            <CardOverflow>
                                <AspectRatio sx={{ minWidth: 150 }}>
                                    <img
                                        className="product-image"
                                        src={product.image}
                                        srcSet={product.image}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body3">{product.category}</Typography>
                                <Typography fontWeight="xl">{product.title}</Typography>

                                <Typography fontSize="xl" fontWeight="xl" sx={{ mt: 1 }}>
                                    {product.price} $
                                </Typography>
                                <Typography level="body2">
                                    (Only <b>7</b> left in stock!)
                                </Typography>
                            </CardContent>
                            <CardOverflow>
                                <Button variant="plette" color="plette" className="button-products" size="lg" onClick={() => addToCart(product)}>
                                    Add to cart
                                </Button>
                            </CardOverflow>
                        </Card>
                        {/* <Card key={product.id} className="h-100">
                            <div className="text-center">
                                <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    $ {product.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center align-items-center" style={{ background: 'white' }}>
                                <Button variant="primary" onClick={() => addToCart(product)}>Add To Cart</Button>
                            </Card.Footer>
                        </Card> */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
