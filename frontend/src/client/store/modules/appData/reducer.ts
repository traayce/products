import {
  INSTALLED,
  UPDATE_FAILED,
  UPDATE_READY,
  UPDATE_SUCCESS,
  UPDATING
} from './constants';
import { IState } from './state';

const defaultState: IState = {
  installed: false,
  isUpdating: false,
  updateFailed: false,
  updateReady:  false,
  updateSuccess: false
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case INSTALLED:
      return {
        ...state,
        installed: true
      };
    case UPDATING:
      return {
        ...state,
        isUpdating: true,
        updateFailed: false,
        updateSuccess: false
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        updateFailed: false,
        updateReady: false,
        updateSuccess: true
      };
    case UPDATE_FAILED:
      return {
        ...state,
        isUpdating: false,
        updateFailed: true,
        updateSuccess: false
      };
    case UPDATE_READY:
      return {
        ...state,
        updateReady: true
      };
    default:
      return state;
  }
};

export default reducer;
