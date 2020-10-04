import {
  signInStart,
  signInComplete,
  signInError,
  signInNameComplete,
  signInNameError
} from './signInSlice';
import axiosInstance from '../../helpers/axiosInstance';
import { AppDispatch, AppThunk } from '../../store/configureStore';

export const fetchUser = (username: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  dispatch(signInStart());
  return axiosInstance
    .post('/api-token-auth/', {
      username,
      password
    })
    .then(({ data }) => {
      const { token } = data;
      localStorage.setItem('token', token);
      if (localStorage.getItem('token')) {
        dispatch(signInComplete(data));
      }
    })
    .catch(({ message }) => {
      dispatch(signInError(message));
    });
};

export const fetchName = (login: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) =>
  axiosInstance
    .post('/api/v1/user/login', {
      login,
      password
    })
    .then(({ data }) => {
      console.log(data);
      localStorage.setItem('user', data.user);
      localStorage.setItem('userId', data.user_id);
      dispatch(signInNameComplete(data));
    })
    .catch(({ message }) => {
      dispatch(signInNameError({ message }));
    });
