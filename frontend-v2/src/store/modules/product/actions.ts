import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_START } from "./constants";
import { productCommands } from "./api";
import { ThunkAction } from "../../action";

export const getProducts = (): ThunkAction => (
  dispatch,
  getState,
  request
) => {
  dispatch(getProductsStart());
  setTimeout(() =>
    productCommands
      .productsApiGet()
      .then(res => {
        if (res.message !== undefined) {
          return dispatch(getProductsFail("error occured while getting players list"));
        }
        return dispatch(getProductsSuccess(res));
      })
      .catch(err => dispatch(getProductsFail("error occured while gettind players list"))), 400);
};

const getProductsSuccess = (res: Array<object>) => {
  return ({
    type: GET_PRODUCTS_SUCCESS,
    products: res
  });
};

const getProductsFail = (error: string) => {
  return ({
    type: GET_PRODUCTS_FAILURE,
    error
  });
};

const getProductsStart = () => ({
  type: GET_PRODUCTS_START
});