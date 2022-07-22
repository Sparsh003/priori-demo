import axios from "axios";

export const getCrypto = (search) => {
  return axios.get(
    `https://api.covalenthq.com/v1/1/address/${search}/balances_v2/?key=ckey_3b932caac7954515b4b0e6c3c0d`
  );
};

export const getTransactionAddress = (transAddress) => {
  return axios.get(
    `https://api.covalenthq.com/v1/1/address/${transAddress}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_3b932caac7954515b4b0e6c3c0d`
  );
};
