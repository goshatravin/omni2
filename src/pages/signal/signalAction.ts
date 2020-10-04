/* eslint-disable max-len */
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
  sendSignalError,
  webSocketMessage,
  signalArchiveStart,
  signalArchiveComplete,
  signalArchiveError,
  joinTicketStart,
  joinTicketComplete,
  joinTicketError,
  remarkTicketStart,
  remarkTicketComplete,
  remarkTicketError,
  remarkClean,
  assigmentStart,
  assigmentComplete,
  assigmentError
} from './signalSlice';
import { AppThunk, AppDispatch } from '../../store/configureStore';
import { signalType } from '../ticket/ticketType';
import {
  joinDetailsUpdate,
  ticketDetailsUpdate,
  ticketDetailsUpdateSend
} from '../ticket/ticketSlice';
import { ISignalData } from './signalType';
import { remarkDetailsUpdate } from '../ticket/ticketAction';

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
  const dataMessage = {
    content_type: '2',
    detail: data.message
  };
  dispatch(sendSignalStart());
  return axiosInstance
    .post(`api/v1/omnichannel/tickets/${ticket_id}/signals`, dataMessage, {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
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
      dispatch(webSocketMessage(newMessage));
      dispatch(ticketDetailsUpdateSend(newMessage));
    })
    .catch(({ message }) => {
      dispatch(sendSignalError(message));
    });
};

export const signalWebSocket = (data: ISignalData) => async (dispatch: AppDispatch) => {
  dispatch(webSocketMessage(data));
};
export const remarkCleanTicket = () => async (dispatch: AppDispatch) => {
  dispatch(remarkClean());
};

export const sendSignalToArchive = (data: signalType): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(signalArchiveStart());
  const info = {
    status_type: '5'
  };
  return axiosInstance
    .put(`api/v1/omnichannel/tickets/${data}`, info, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(signalArchiveComplete());
      const status = { status_type: 'Архив' };
      dispatch(joinDetailsUpdate({ data, status }));
    })
    .catch(({ message }) => {
      dispatch(signalArchiveError(message));
    });
};

export const joinTicket = (data: string) => async (dispatch: AppDispatch) => {
  dispatch(joinTicketStart());
  const info = {
    status_type: 3,
    assigned_to: localStorage.getItem('userId')
  };
  return axiosInstance
    .put(`api/v1/omnichannel/tickets/${data}`, info, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(joinTicketComplete());
      const status = { status_type: 'Активное' };
      dispatch(joinDetailsUpdate({ data, status }));
    })
    .catch(({ message }) => {
      dispatch(joinTicketError(message));
    });
};

export const remarkTicket = (data: string, remark: string) => async (dispatch: AppDispatch) => {
  dispatch(remarkTicketStart());
  const info = {
    remark
  };
  return axiosInstance
    .put(`api/v1/omnichannel/tickets/${data}`, info, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(remarkTicketComplete());
      dispatch(remarkDetailsUpdate(data, remark));
    })
    .catch(({ message }) => {
      dispatch(remarkTicketError(message));
    });
};

export const sendAssigment = (data: string) => async (dispatch: AppDispatch) => {
  dispatch(assigmentStart());
  const info = {
    status_type: '4'
  };
  return axiosInstance
    .put(`api/v1/omnichannel/tickets/${data}`, info, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(assigmentComplete());
      const status = {
        status_type: 'Запрос на изменение ответственного'
      };
      dispatch(joinDetailsUpdate({ data, status }));
    })
    .catch(({ message }) => {
      dispatch(assigmentError(message));
    });
};
