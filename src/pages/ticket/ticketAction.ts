/* eslint-disable import/no-extraneous-dependencies */
import qs from 'qs';
import axiosInstance from '../../helpers/axiosInstance';
import {
  ticketFetchingStart,
  ticketFetchingComplete,
  ticketFetchingError,
  ticketClean,
  signalCompleted,
  signalClose,
  ticketWebSocket,
  ticketDetailsUpdate
} from './ticketSlice';
import { AppThunk, AppDispatch } from '../../store/configureStore';
import { ITicketState, signalType } from './ticketType';

const fetchTickets = (page: number, statusTypeId = '', assignedTo = ''): AppThunk => async (
  dispatch: AppDispatch
) => {
  dispatch(ticketFetchingStart());
  return axiosInstance
    .get('api/v1/omnichannel/tickets', {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      },
      params: {
        page,
        status_type_id: statusTypeId || undefined,
        assigned_to: assignedTo || undefined
      },
      paramsSerializer: (params) => qs.stringify(params, { indices: false })
    })
    .then((response) => {
      dispatch(ticketFetchingComplete(response.data));
    })
    .catch(({ message }) => {
      dispatch(ticketFetchingError(message));
    });
};
export const cleanTickets = () => async (dispatch: AppDispatch) => {
  dispatch(ticketClean());
};
export const saveSignal = (data: signalType) => async (dispatch: AppDispatch) => {
  dispatch(signalCompleted(data));
};
export const CloseSignal = () => (dispatch: AppDispatch) => {
  dispatch(signalClose());
};
export const AddTicketWebSocket = (data: ITicketState) => async (dispatch: AppDispatch) => {
  dispatch(ticketWebSocket(data));
};
export const UpdateTicketTextWebSocket = (data: ITicketState) => async (dispatch: AppDispatch) => {
  dispatch(ticketDetailsUpdate(data));
};
export default fetchTickets;
