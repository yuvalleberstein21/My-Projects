import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';


const Cart = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart);

    if (products.length === 0) {
        return <h3 className="d-flex justify-content-center mt-5">Bag is empty...</h3>
    }

    const removeToCart = (id) => {
        dispatch(remove(id));
    }

    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-12" style={{ marginBottom: '10px' }}>
                        <Card key={product.id} className="h-100">
                            <div className="text-center">
                                <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    $ {product.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer style={{ background: 'white' }}>
                                <div className="d-flex justify-content-center">
                                    <Button variant="danger" onClick={() => removeToCart(product.id)}>Remove Item</Button>
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
