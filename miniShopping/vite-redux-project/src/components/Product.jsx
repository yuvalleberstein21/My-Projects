import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from "../store/productSlice";
import statusCode from "../utils/statusCode";
import { MDBSpinner } from 'mdb-react-ui-kit';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { useNavigate } from "react-router-dom";



const Product = () => {
    const navigate = useNavigate();
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

    const handleSubmit = (product) => {
        navigate(`/productDetails/${product.id}`, { state: { product } })
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
                    <div key={product.id} className="col-md-3 gap-2" style={{ marginBottom: '25px' }}>
                        <Card className="h-100" sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
                            <CardOverflow>

                                <img
                                    className="product-image"
                                    src={product.image}
                                    srcSet={product.image}
                                    loading="lazy"
                                    alt=""
                                    onClick={() => handleSubmit(product)}
                                />
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

                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
