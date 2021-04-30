import React                       from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { useDispatch }             from 'react-redux';
import { logout }                  from '../../actions';

const DashboardHeader = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand href="/">NCCP Information System</Navbar.Brand>
        <Nav>
          <Nav.Link
            style={{
              borderLeft : '1px solid grey',
              borderRight: '1px solid grey',
            }}
          >
            Notifications
          </Nav.Link>
          <Nav.Link
            style={{
              borderRight: '1px solid grey',
            }}
          >
            avatar
          </Nav.Link>
        </Nav>
      </Container>
      {/* <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">NCCP Information System</Navbar.Brand>

          <DropdownButton
            menuAlign="right"
            variant="secondary"
            title={<BsThreeDotsVertical />}
          >
            <Dropdown.Header>
              <b>Noor Muhammad</b>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item href="/dashboard">
              <RiDashboardLine style={{ marginRight: "10px" }} />
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item href="/cart">
              <AiOutlineShoppingCart style={{ marginRight: "10px" }} />
              Cart
            </Dropdown.Item>
            <Dropdown.Item href="/settings">
              <AiOutlineSetting style={{ marginRight: "10px" }} />
              User Profile/Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleLogout()}>
              <CgLogOut style={{ marginRight: "10px" }} />
              Logout
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar> */}
    </Navbar>
  );
};
export default DashboardHeader;
