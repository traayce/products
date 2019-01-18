import { combineReducers } from 'redux';
import appDataReducer from './modules/appData';
import { productsReducer } from './modules/product';
import { IStore } from './state';

const reducer = combineReducers<IStore>({
  appData: appDataReducer,
  products: productsReducer
});

export default reducer;

