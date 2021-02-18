import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_POST_REQUEST,
  PRODUCT_POST_SUCCESS,
  PRODUCT_POST_FAIL,
  PRODUCT_POST_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_RESET,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL
} from '../types';

export const productListReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false
      }
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        product: { reviews: [] },
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false
      }
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_POST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_POST_SUCCESS:
      return {
        ...state,
        success: true,
        product: action.payload.createdProduct,
        loading: false,
      }
    case PRODUCT_POST_RESET:
      return {}
    case PRODUCT_POST_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload
      }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const productReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CREATE_REVIEW_RESET:
      return {}
    case CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const productsTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case GET_TOP_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    case GET_TOP_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}