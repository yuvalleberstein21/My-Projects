import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'



const NavbarPanel = () => {

    const cartProducts = useSelector(state => state.cart);




    return (
        <Navbar className='navbar' expand="lg">
            <Container fluid>
                <Navbar.Brand><Nav.Link className="brand-navbar" to="/" as={Link}> MiniShopping</Nav.Link></Navbar.Brand>
                <Nav className='nav'>
                    <Nav.Link className="nav-link" to="/" as={Link}>Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="nav-link" to="/products" as={Link}>Products</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Nav.Link className="nav-link cart-brand" to="/cart" as={Link}><FontAwesomeIcon icon={faCartShopping} /> ({cartProducts.length})</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default NavbarPanel;
