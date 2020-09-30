import { signInStart, signInComplete, signInError } from './signInSlice';
import axiosInstance from '../../helpers/axiosInstance';
import { AppDispatch, AppThunk } from '../../store/configureStore';

const fetchUser = (username: string, password: string): AppThunk => async (
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

export default fetchUser;
