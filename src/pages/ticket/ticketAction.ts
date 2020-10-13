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
  ticketDetailsUpdate,
  ticketDelete,
  ticketUpdate,
  signalSaveStart,
  remarDetailsUpdate,
  ticketAssignWebSocket
} from './ticketSlice';
import { AppThunk, AppDispatch } from '../../store/configureStore';
import { ITicketState, signalType } from './ticketType';

// get all tickets
const fetchTickets = (
  page: number,
  statusTypeId = '',
  assignedTo = '',
  search?: string
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(ticketFetchingStart());
  return axiosInstance
    .get('api/v1/omnichannel/tickets', {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      },
      params: {
        page,
        status_type_id: statusTypeId || undefined,
        assigned_to: assignedTo || undefined,
        search
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

// clean ticket slice
export const cleanTickets = () => async (dispatch: AppDispatch) => {
  dispatch(ticketClean());
};
// save current signal
export const saveSignal = (data: signalType) => async (dispatch: AppDispatch) => {
  dispatch(signalSaveStart());
  dispatch(signalCompleted(data));
};
// close current signal
export const CloseSignal = () => (dispatch: AppDispatch) => {
  dispatch(signalClose());
};
// add new ticket throw web socket
export const AddTicketWebSocket = (data: ITicketState) => async (dispatch: AppDispatch) => {
  const myObj = data;
  myObj.newTicket = true;
  dispatch(ticketWebSocket(myObj));
};
export const AddTicketAssignWebSocket = (data: ITicketState) => async (dispatch: AppDispatch) => {
  const myObj = data;
  myObj.newTicket = true;
  dispatch(ticketAssignWebSocket(myObj));
};
// update details into ticket
export const UpdateTicketTextWebSocket = (data: ITicketState) => async (dispatch: AppDispatch) => {
  dispatch(ticketDetailsUpdate(data));
};
// archive ticket
export const deleteTicket = (data: string) => async (dispatch: AppDispatch) => {
  dispatch(ticketDelete(data));
};
// update current Ticket
export const updateTicket = (data: string) => async (dispatch: AppDispatch) =>
  axiosInstance
    .get(`api/v1/omnichannel/tickets/${data}`, {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(ticketUpdate(response.data));
    })
    .catch(({ message }) => {
      console.log(message);
    });
export const remarkDetailsUpdate = (data: any, remark: any) => (dispatch: AppDispatch) => {
  dispatch(remarDetailsUpdate({ data, remark }));
};
// export const joinDetailsUpdate = (data: any, status_type: string) => (dispatch: AppDispatch) => {
//   dispatch(joinDetailsUpdate(data, status_type));
// };
export default fetchTickets;
