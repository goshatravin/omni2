/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import SignInSlice from '../pages/signIn/signInSlice';
import TicketSlice from '../pages/ticket/ticketSlice';
import SignalSlice from '../pages/signal/signalSlice';

const combinedReducer = combineReducers({
  SignInSlice,
  TicketSlice,
  SignalSlice
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'Reset/resetSlice') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
