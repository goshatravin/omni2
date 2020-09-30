/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../helpers/axiosInstance';
import {
  signalFetchingStart,
  signalFetchingComplete,
  signalFetchingError,
  signalClean,
  sendSignalStart,
  sendSignalComplete,
  sendSignalError
} from './signalSlice';
import { AppThunk, AppDispatch } from '../../store/configureStore';
import { signalType } from '../ticket/ticketType';
import { ticketDetailsUpdate } from '../ticket/ticketSlice';
import { ISignalData } from './signalType';

export const fetchSignals = (data: signalType): AppThunk => async (dispatch: AppDispatch) => {
  // очистка ванишем
  // if (page === 1) {
  //   dispatch(signalClean());
  // }
  dispatch(signalFetchingStart());
  const { ticket_id } = data;
  return axiosInstance
    .get(`api/v1/omnichannel/tickets/${ticket_id}/signals`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(signalFetchingComplete(response.data));
    })
    .catch(({ message }) => {
      dispatch(signalFetchingError(message));
    });
};

export const sendSignal = (ticket_id: string, data: any): AppThunk => async (
  dispatch: AppDispatch
) => {
  dispatch(sendSignalStart());
  return axiosInstance
    .post(`api/v1/omnichannel/tickets/${ticket_id}/signals`, {
      content_type: '2',
      detail: data.message
    })
    .then((response) => {
      const ID = () => `_${Math.random().toString(36).substr(2, 9)}`;
      const newMessage = {
        signal_id: ID(),
        ticket: ticket_id,
        content_type: '2',
        created_at: Date.now(),
        detail: data.message
      };
      dispatch(sendSignalComplete(newMessage));
      dispatch(ticketDetailsUpdate(newMessage));
    })
    .catch(({ message }) => {
      dispatch(sendSignalError(message));
    });
};

export const signalWebSocket = (data: ISignalData) => async (dispatch: AppDispatch) => {
  dispatch(ticketDetailsUpdate(data));
};
