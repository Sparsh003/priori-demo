import {
  getCrypto,
  getTransactionAddress,
} from "../../service/dashboard.service";
import {
  CRYPTO_DATA_FAILURE,
  CRYPTO_DATA_REQUEST,
  CRYPTO_DATA_SUCCESS,
  TRANSACTION_DATA_REQUEST,
  TRANSACTION_DATA_SUCCESS,
  TRANSACTION_DATA_FAILURE,
  CRYPTO_RESET_DATA,
} from "../constant/types";

export const getCryptoTransaction = (search) => {
  return (dispatch) => {
    dispatch(resetCrypto());
    dispatch(fetchCryptoRequest());
    getCrypto(search)
      .then((response) => {
        const data = response.data;
        dispatch(fetchCryptoSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchCryptoFailure(error?.response?.data?.error));
      });
  };
};

export const getCryptoTransactionAddress = (transAddress) => {
  return (dispatch) => {
    dispatch(fetchTransAddressRequest());
    getTransactionAddress(transAddress)
      .then((response) => {
        const data = response.data;
        dispatch(fetchTransAddressSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchTransAddressFailure(error.message));
      });
  };
};

export const fetchCryptoRequest = () => {
  return {
    type: CRYPTO_DATA_REQUEST,
  };
};

export const fetchCryptoSuccess = (data) => {
  return {
    type: CRYPTO_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchCryptoFailure = (error) => {
  return {
    type: CRYPTO_DATA_FAILURE,
    payload: error,
  };
};

export const fetchTransAddressRequest = () => {
  return {
    type: TRANSACTION_DATA_REQUEST,
  };
};

export const fetchTransAddressSuccess = (data) => {
  return {
    type: TRANSACTION_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchTransAddressFailure = (error) => {
  return {
    type: TRANSACTION_DATA_FAILURE,
    payload: error,
  };
};

export const resetCrypto = () => {
  return {
    type: CRYPTO_RESET_DATA,
  };
};
