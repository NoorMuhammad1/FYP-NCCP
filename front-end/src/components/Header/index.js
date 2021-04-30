import ShoppingCartIcon                                      from '@material-ui/icons/ShoppingCart';
import React, { useEffect, useState }                        from 'react';
import { Container, Dropdown, DropdownButton, Nav, Navbar, } from 'react-bootstrap';
import { CgLogOut }                                          from 'react-icons/cg';
import { RiDashboardLine }                                   from 'react-icons/ri';
import { useDispatch, useSelector }                          from 'react-redux';
import { Link }                                              from 'react-router-dom';
import { logout }                                            from '../../actions';
import './style.css';

const Header = (props) => {
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const cart_size = useSelector((state) => state.cart.size);

  useEffect(() => {
    setCartCount(cart_size);
  }, [cart_size]);
  const loggedInNavLinks = () => {
    return (
      <>
        <DropdownButton title="options">
          <Dropdown.Header>
            <b>Noor Muhammad</b>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>
            <RiDashboardLine style={{ marginRight: '10px' }} />
            <Link to="/dashboard">Dashboard</Link>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              logUserOut();
            }}
          >
            <CgLogOut style={{ marginRight: '10px' }} />
            Logout
          </Dropdown.Item>
          <ShoppingCartIcon />
        </DropdownButton>
      </>
    );
  };

  const loggedOutNavLinks = () => {
    return (
      <>
        <Nav.Link href="/signin">Signin</Nav.Link>
        <Nav.Link href="/signup">Signup</Nav.Link>
        <Nav.Link href="/cart" id="shopping-cart-box">
          <div>
            <ShoppingCartIcon id="shopping-cart-icon" />
          </div>
          {cart_size > 0 ? (
            <div id="shopping-cart-number">{`${cart_size}`}</div>
          ) : null}
        </Nav.Link>

        <Nav.Link href="/catalogue">Catalogue</Nav.Link>
      </>
    );
  };

  const logUserOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar
        variant="dark"
        style={{ backgroundColor: '#212529', zIndex: 1 }}
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="/">NCCP Information System</Navbar.Brand>
          <Nav>
            {useSelector((state) => state.auth.token)
              ? loggedInNavLinks()
              : loggedOutNavLinks()}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
