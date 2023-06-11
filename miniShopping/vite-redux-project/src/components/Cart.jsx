import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';



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
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-12" style={{ marginBottom: '10px' }}>
                        <Card key={product.id} className="h-100 card-cart">
                            <div className="text-center">
                                <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.qty} X ${product.price} = $
                                    {product.qty * product.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer style={{ background: 'white' }}>
                                <div className="d-flex justify-content-center">
                                    <Button variant="danger" onClick={() => removeToCart(product)}>Remove Item</Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </div>

                ))}
            </div>
        </div>
    )
};

export default Cart;
