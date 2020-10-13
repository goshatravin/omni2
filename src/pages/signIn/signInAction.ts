import {
  signInStart,
  signInComplete,
  signInError,
  signInNameComplete,
  signInNameError,
  userStatusListStart,
  userStatusListComplete,
  userStatusListError,
  userListStart,
  userListComplete,
  userListError,
  changeStatusStart,
  changeStatusComplete,
  changeStatusError
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

export const fetchStatuses = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(userStatusListStart());
  axiosInstance
    .get('/api/v1/user/user_status_types')
    .then(({ data }) => {
      console.log(data);
      dispatch(userStatusListComplete(data));
    })
    .catch(({ message }) => {
      dispatch(userStatusListError({ message }));
    });
};

export const fetchUsers = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(userListStart());
  axiosInstance
    .get('/api/v1/user/users')
    .then(({ data }) => {
      console.log(data);
      dispatch(userListComplete(data));
    })
    .catch(({ message }) => {
      dispatch(userListError({ message }));
    });
};

export const changeStatus = (value: any): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(changeStatusStart());
  axiosInstance
    .put(`/api/v1/user/statuses/${localStorage.getItem('userId')}`, {
      user_status_type_id: value
    })
    .then(({ data }) => {
      console.log(data);
      dispatch(changeStatusComplete(data));
    })
    .catch(({ message }) => {
      dispatch(changeStatusError({ message }));
    });
};
