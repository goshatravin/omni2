/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import { ITicket, ITicketState } from './ticketType';

const initialState: ITicket = {
  ticketState: [],
  ticketStatus: 'none',
  ticketIsLoading: false,
  ticketError: '',
  ticketHasMore: false,

  ticketIsOpen: false,
  currentSignal: {}
};

const Tickets = createSlice({
  name: 'Ticket',
  initialState,
  reducers: {
    ticketFetchingStart: (state: ITicket) => {
      state.ticketStatus = 'requesting';
      state.ticketIsLoading = true;
    },
    ticketFetchingComplete: (state: ITicket, action) => {
      state.ticketStatus = 'success';
      state.ticketIsLoading = false;
      state.ticketState = [...state.ticketState, ...action.payload.results];
      state.ticketHasMore = action.payload.count > state.ticketState.length;
    },
    ticketFetchingError: (state: ITicket, action) => {
      state.ticketStatus = 'failed';
      state.ticketIsLoading = false;
      state.ticketError = action.payload;
      state.ticketHasMore = false;
    },
    signalCompleted: (state: ITicket, action) => {
      state.ticketIsOpen = true;
      state.currentSignal = action.payload;
    },
    signalClose: (state: ITicket) => {
      state.ticketIsOpen = false;
      state.currentSignal = {};
    },
    ticketDetailsUpdate: (state: ITicket, action) => {
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        item.ticket_id === action.payload.ticket
          ? { ...item, latest_signal: action.payload.detail, created_at: action.payload.created_at }
          : item
      );
    },
    ticketWebSocket: (state: ITicket, action) => {
      state.ticketState = [action.payload, ...state.ticketState];
    },
    ticketClean: (state: ITicket) => {
      state.ticketState = [];
      state.ticketStatus = 'none';
      state.ticketIsLoading = false;
      state.ticketError = '';
      state.ticketHasMore = false;
    }
  }
});

export const {
  ticketFetchingStart,
  ticketFetchingComplete,
  ticketFetchingError,
  ticketClean,
  signalCompleted,
  ticketDetailsUpdate,
  signalClose,
  ticketWebSocket
} = Tickets.actions;
export default Tickets.reducer;
