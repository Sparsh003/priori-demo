import {
    CRYPTO_DATA_FAILURE,
    CRYPTO_DATA_REQUEST,
    CRYPTO_DATA_SUCCESS,
    TRANSACTION_DATA_REQUEST,
    TRANSACTION_DATA_SUCCESS,
    TRANSACTION_DATA_FAILURE,
    CRYPTO_RESET_DATA,
  } from "../constant/types";
  
  const initialState = {
    loading: false,
    data: [],
    address: [],
    error:""
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case CRYPTO_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CRYPTO_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case CRYPTO_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case TRANSACTION_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case TRANSACTION_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          address: action.payload,
        };
  
      case TRANSACTION_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CRYPTO_RESET_DATA:
        return {
          ...state,
          loading: false,
          data: [],
          address: [],
          error:""
        };
  
      default:
        return state;
    }
  };
  
  export default Reducer;
  