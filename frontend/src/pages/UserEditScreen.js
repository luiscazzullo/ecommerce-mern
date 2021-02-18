import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../types';

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id
  const [values, setValues] = useState({
    name: '',
    email: '',
    isAdmin: false
  });

  const { email, name, isAdmin } = values;
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setValues({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        })
      }
    }
  }, [user, userId, user, successUpdate, history])

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Volver
      </Link>
      <FormContainer>
        <h1>Editar usuario</h1>
        { loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {
          loading 
          ? <Loader />
          : error
          ? <Message variant="danger">{error}</Message>
          : (
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
              <Form.Group controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  name="password"
                  label="Nombrar admin"
                  value={isAdmin}
                  checked={isAdmin}
                  onChange={e => setValues({ ...values, isAdmin: e.target.checked })}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Actualizar
              </Button>
            </Form>
          )
        }
      </FormContainer>
    </>
  );
}

export default UserEditScreen;