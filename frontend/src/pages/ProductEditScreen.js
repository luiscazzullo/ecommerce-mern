import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import clientAxios from '../config/clientAxios';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../types';

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id
  const [values, setValues] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: ''
  });
  const [upload, setUpload] = useState(false);

  const { name, price, image, brand, category, countInStock, description } = values;
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.product);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setValues({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description
        })
      }
    }
  }, [dispatch, history, productId, product, success])

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      ...values
    }))
  }

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUpload(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await clientAxios.post('/upload', formData, config);
      setValues({
        ...values,
        image: data
      })
      setUpload(false);
    } catch (error) {
      console.log(error.response);
      setUpload(false);
    }
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Volver
      </Link>
      <FormContainer>
        <h1>Editar Producto</h1>
        {loadingUpdate && <Loader />}
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
                      placeholder="Ingrese el nombre del producto"
                      value={name}
                      onChange={e => setValues({ ...values, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Ingrese el precio del producto"
                      value={price}
                      onChange={e => setValues({ ...values, price: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="image">
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      placeholder="Seleccione una imagen"
                      value={image}
                      onChange={e => setValues({ ...values, image: e.target.value })}
                    />
                    <Form.File
                      id="image-file"
                      label="Elija una foto"
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {upload && <Loader />}
                  </Form.Group>
                  <Form.Group controlId="brand">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      placeholder="Ingrese la marca de su producto"
                      value={brand}
                      onChange={e => setValues({ ...values, brand: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="countInStock">
                    <Form.Label>Stock:</Form.Label>
                    <Form.Control
                      type="number"
                      name="countInStock"
                      placeholder="El stock de su producto"
                      value={countInStock}
                      onChange={e => setValues({ ...values, countInStock: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="category">
                    <Form.Label>Categoría:</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      placeholder="Seleccione una categoría"
                      value={category}
                      onChange={e => setValues({ ...values, category: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Ingrese una descripción"
                      value={description}
                      onChange={e => setValues({ ...values, description: e.target.value })}
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

export default ProductEditScreen;