import { state as appDataState } from './modules/appData';
import { IState as productState } from './modules/product';
export interface IStore {
  readonly appData: appDataState.IState;
  readonly products:  productState
}
