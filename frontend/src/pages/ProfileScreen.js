import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../types';

const ProfileScreen = ({ location, history }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState(null)
  const { password, email, name, confirmPassword } = values;

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector(state => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if(!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(getMyOrders());
      } else {
        setValues({
          ...values,
          name: user.name,
          email: user.email
        })
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Perfil</h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Usuario actualizado</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Ingrese su password"
              value={password}
              onChange={e => setValues({ ...values, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirme su contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Repita su contraseña"
              value={confirmPassword}
              onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Actualizar
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mis compras</h2>
        {
          loadingOrders 
          ? <Loader />
          : errorOrders 
          ? <Message variant="danger">{errorOrders}</Message>
          : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Pagado</th>
                  <th>Entregado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}</td>
                    <td>{order.isDeliverd ? order.deliveredAt.substring(0, 10) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="button-sm" variant="light">Detalles</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )

        }
      </Col>
    </Row>
  );
}

export default ProfileScreen;