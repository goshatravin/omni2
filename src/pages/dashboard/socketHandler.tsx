/* eslint-disable no-new */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { Dispatch } from 'react';
import { ISignalData } from '../signal/signalType';
import { AddTicketWebSocket } from '../ticket/ticketAction';
import { ITicketState } from '../ticket/ticketType';
import { Notification } from './notificationHandler';
import { Text } from './text';

// Get new ticket through websocket connection
export const NewTicket = (dispatch: Dispatch<any>, data: ITicketState, currentBtn: string) => {
  // Мои
  if (currentBtn === '1' && localStorage.getItem('userId') === data.assigned_to) {
    dispatch(AddTicketWebSocket(data));
    Notification(Text.notifications.new_ticket);
    // Новые
  } else if (currentBtn === '2' && data.status_type_id === '1') {
    dispatch(AddTicketWebSocket(data));
    Notification(Text.notifications.new_ticket);
    // В очереди
  } else if (currentBtn === '3' && data.status_type_id === '2') {
    dispatch(AddTicketWebSocket(data));
    Notification(Text.notifications.new_ticket);
    // Все
  } else if (currentBtn === '4') {
    dispatch(AddTicketWebSocket(data));
    Notification(Text.notifications.new_ticket);
  } else {
    Notification(Text.notifications.new_ticket);
  }
};
// Get new signal throw websocket connection

export const NewSignal = (dispatch: Dispatch<any>, data: ISignalData) => {
  console.log(data);
  Notification(Text.notifications.new_signal);
};

export const NewAssigne = (dispatch: Dispatch<any>, data: ITicketState, currentBtn: string) => {
  if (currentBtn === '3') {
    dispatch(AddTicketWebSocket(data));
    Notification(Text.notifications.new_assigne);
  } else {
    Notification(Text.notifications.new_assigne);
  }
};
