import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [values, setValues] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || ''
  });
  const { address, city, postalCode, country } = values;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(values));
    history.push('/payment');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Proceso de compra</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Dirección:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={e => setValues({ ...values, address: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Ciudad:</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Ingrese su ciudad"
            value={city}
            onChange={e => setValues({ ...values, city: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Código postal:</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            placeholder="Ingrese su código postal"
            value={postalCode}
            onChange={e => setValues({ ...values, postalCode: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>País:</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Ingrese su país de residencia"
            value={country}
            onChange={e => setValues({ ...values, country: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
}
 
export default ShippingScreen;