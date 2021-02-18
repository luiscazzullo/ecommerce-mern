import React, { useEffect, useState } from 'react';
import clientAxios from '../config/clientAxios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliveredOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../types';

const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDelivered = useSelector(state => state.orderDelivered);
  const { loading: deliveredLoading, success: successDelivered } = orderDelivered;

  if(!loading) {
    const addDecimals = number => {
      return (Math.round(number * 100) / 100).toFixed(2);
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }

  useEffect(() => {
    if(!userInfo) {
      history.push('/login');
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await clientAxios.get('/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    if(!order || successPay || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(getOrderDetails(match.params.id));
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, match, successPay, order, successDelivered])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(match.params.id, paymentResult));
  }

  const deliveredHandler = () => {
    dispatch(deliveredOrder(order));
  }
  return (
    <>
      {
        loading 
        ? <Loader />
        : error
        ? <Message variant="danger">{error}</Message>
        : 
        <>
          <h1>Order: {order._id}</h1>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Dirección</h2>
                      <p><strong>Nombre: </strong>{order.user.name}</p>
                      <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                      <p>
                        <strong>Dirección:</strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city} {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                      </p>
                      {
                        order.isDelivered
                          ? <Message variant="success">Entregado el {order.deliveredAt}</Message>
                          : <Message variant="danger">No fue entregado</Message>
                      }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>Método de pago</h2>
                      <p>
                        <strong>Método:</strong>{order?.paymentMethod}
                      </p>
                      {
                        order.isPaid 
                        ? <Message variant="success">Pagada el {order.paidAt}</Message>
                        : <Message variant="danger">No fue pagada</Message>
                      }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>Productos</h2>
                      {
                        order.orderItems.length === 0
                          ? <Message>Su carrito está vacío</Message>
                          : (
                            <ListGroup variant="flush">
                              {order?.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                  <Row>
                                    <Col md={1}>
                                      <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                      <Link to={`/product/${item.product}`}>
                                        {item.name}
                                      </Link>
                                    </Col>
                                    <Col md={4}>
                                      {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          )
                      }
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h2>Resumen</h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Items</Col>
                          <Col>${order.itemsPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Dirección</Col>
                          <Col>${order.shippingPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Impuestos</Col>
                          <Col>${order.taxPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Total</Col>
                          <Col>${order.totalPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      {!order.isPaid && (
                        <ListGroup.Item>
                          {loadingPay && <Loader />}
                          {!sdkReady ? <Loader /> : (
                            <PayPalButton 
                              amount={order.totalPrice}
                              onSuccess={successPaymentHandler}
                            />
                          )}
                        </ListGroup.Item>
                      )}
                      {deliveredLoading && <Loader />}
                      {
                        userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                          <ListGroup.Item>
                            <Button
                              type="button"
                              className="btn btn-block"
                              onClick={deliveredHandler}>
                              Entregado
                                </Button>
                          </ListGroup.Item>
                        )
                      }
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
        </>
      }
    </>
  );
}

export default OrderScreen;