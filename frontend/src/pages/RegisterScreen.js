import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState(null)
  const { password, email, name, confirmPassword } = values;
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
    } else {
      dispatch(register(email, password, name));
    }
  }

  return (
    <FormContainer>
      <h1>Regístrese</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
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
          Registro
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Ingresa</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;