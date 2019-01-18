import { createAction } from 'client/store/action';
import {
  INSTALLED,
  UPDATE_FAILED,
  UPDATE_READY,
  UPDATE_SUCCESS,
  UPDATING
} from './constants';

export const installed = createAction(INSTALLED);
export const updating = createAction(UPDATING);
export const updateReady = createAction(UPDATE_READY);
export const updateSuccess = createAction(UPDATE_SUCCESS);
export const updateFailed = createAction(UPDATE_FAILED);
