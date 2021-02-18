import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const ordersList = useSelector(state => state.getAllOrders);
  const { error, loading, orders } = ordersList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push('/login')
    }

  }, [dispatch, userInfo, history])

  return (
    <>
      <h1>Lista de Pedidos</h1>
      {
        loading
          ? <Loader />
          : error
            ? <Message variant="danger">{error}</Message>
            : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
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
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid
                          ? (order.paidAt.substring(0, 10))
                          : (<i className="fas fa-times" style={{ color: 'red' }}></i>)
                        }
                      </td>
                      <td>
                        {order.isDelivered
                          ? (order.deliveredAt.substring(0, 10))
                          : (<i className="fas fa-times" style={{ color: 'red' }}></i>)
                        }
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light" className="btn-sm">
                            Ver detalles
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
      }
    </>
  );
}

export default OrderListScreen;