import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { CREATE_REVIEW_RESET } from '../types';
 
const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.product);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviews = useSelector(state => state.productReviews);
  const { error: errorReview, success } = productReviews;

  useEffect(() => {
    if(success) {
      alert('Review añadida');
      setRating(0);
      setComment('');
      dispatch({ type: CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, success])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, {rating, comment}));
  }

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Volver
      </Link>
      {loading 
        ? <Loader /> 
        : error 
        ? <Message variant="danger">{error}</Message>
        : (
        <>
          <Meta title={product.name} keywords={product.description} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product?.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Precio: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Descripción: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Precio:
                </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                </Col>
                      <Col>
                        <strong>{product.countInStock > 0 ? 'Disponible' : 'Sin stock'}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Cantidad</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={quantity}
                              onChange={e => setQuantity(e.target.value)}
                            >
                              {
                                [...Array(product.countInStock).keys()].map(x => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  }
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Añadir al carrito
              </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No hay reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Escribe una review</h2>
                  {errorReview && <Message variant="danger">{errorReview}</Message>}
                    {userInfo 
                      ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
                              <option value="">Seleccione..</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control 
                              as="textarea" 
                              row="3" 
                              value={comment}
                              onChange={e => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button type="submit" variant="primary">
                            Enviar
                          </Button>
                        </Form>
                      ) 
                      : <Message>
                          <Link to="/login">Inicia sesión</Link> para comentar
                        </Message>
                    }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
        )
      }
    </>
  );
}
 
export default ProductScreen;