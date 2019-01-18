import { applyMiddleware, compose, createStore, Middleware, Reducer, Store } from 'redux';
import middleware from './middleware';
import productsReducer from './rootReducer';
import { IStore } from './state';

declare const module: Module;
type StoreCreator = (reducer: Reducer<IStore>, preloadedState: IStore | undefined) => Store<IStore | {}>;

export default (initialState?: IStore): Store<IStore | {}> => {
  let finalCreateStore: StoreCreator;

  if (__DEVTOOLS__ && __CLIENT__) {
    // TODO: fix types
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )(createStore) as StoreCreator;
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(productsReducer, initialState);

  if (!__PROD__ && module.hot) {
    module.hot.accept('./rootReducer.ts', () => store.replaceReducer(productsReducer));
  }

  return store;
};
