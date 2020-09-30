/* eslint-disable import/prefer-default-export */
import { AppDispatch } from './configureStore';
import { resetSlice } from './globalSlice';

export const reset = () => async (dispatch: AppDispatch) => {
  localStorage.clear();
  dispatch(resetSlice());
};
