import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import Searchbox from './Searchbox';

const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Searchbox />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              {
                userInfo
                ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="profile">
                      <NavDropdown.Item>Perfil</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Cerrar sesión</NavDropdown.Item>
                  </NavDropdown>
                )
                : (
                <LinkContainer to = "/login">
                  <Nav.Link><i className="fas fa-user"></i>Ingresa</Nav.Link>
                </LinkContainer>
                )}
                {
                  userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Usuarios</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Productos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderslist">
                      <NavDropdown.Item>Pedidos</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  )
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
 
export default Header;