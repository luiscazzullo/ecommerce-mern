import { 
  PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL, 
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_POST_REQUEST,
  PRODUCT_POST_SUCCESS,
  PRODUCT_POST_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL
} from '../types';
import axiosClient from '../config/clientAxios';
import { bindActionCreators } from 'redux';

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axiosClient.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    })
  }
}

export const listProductDetails = (id) => async(dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST});
    const { data } = await axiosClient.get(`/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axiosClient.delete(`/products/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS })

  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_POST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axiosClient.post(`/products`, {}, config);
    dispatch({
      type: PRODUCT_POST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_POST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axiosClient.put(`/products/${product._id}`, product, config);
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axiosClient.post(`/products/${productId}/reviews`, review, config);
    dispatch({ type: CREATE_REVIEW_SUCCESS })

  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const getTopProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TOP_PRODUCTS_REQUEST });

    const response = await axiosClient.get(`/products/top`);

    dispatch({ 
      type: GET_TOP_PRODUCTS_SUCCESS,
      payload: response.data 
    })

  } catch (error) {
    dispatch({
      type: GET_TOP_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}