/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import history from './history';

const axiosInstance = axios.create({
  baseURL: 'http://10.30.200.5:80',
  withCredentials: true,
  method: 'GET'
});
if (localStorage.getItem('token')) {
  axiosInstance.defaults.headers.common.Authorization = `token ${localStorage.getItem('token')}`;
}
axiosInstance.interceptors.response.use(
  (res) => res
  // (error) => {
  //   if (error.response) {
  //     if (error.response.status === 404) {
  //       history.push('/404');
  //     }
  //     if (error?.response?.data?.non_field_errors[0]) {
  //       throw new Error(error?.response?.data?.non_field_errors[0]);
  //     }
  //     throw new Error(error);
  //   }
  // }
);

export default axiosInstance;
