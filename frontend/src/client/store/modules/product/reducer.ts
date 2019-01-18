import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_START } from './constants';
import { IState } from './state';

const defaultState: IState = {
  products: [],
  isLoading: false,
  error: undefined
};

export const productsReducer = (state : IState = defaultState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        products: action.products,
        isLoading: false,
        error: undefined
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        products: [],
        error: action.error
      };
      case GET_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
        error: undefined
      }
    default:
      return state;
  }
};

