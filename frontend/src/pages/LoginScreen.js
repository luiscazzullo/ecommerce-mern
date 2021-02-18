import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const { password, email } = values;
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const dispatch = useDispatch();
  return (
    <FormContainer>
      <h1>Ingrese</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={e => setValues({ ...values, email: e.target.value})}
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
        <Button type="submit" variant="primary">
          Ingresar
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          ¿Nuevo usuario? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Regístrese aquí</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;