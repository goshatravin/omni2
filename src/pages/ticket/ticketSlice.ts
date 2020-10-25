/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
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
    signalSaveStart: (state: ITicket) => {
      state.ticketIsOpen = false;
    },
    signalCompleted: (state: ITicket, action) => {
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        (item.ticket_id === action.payload.ticket_id && item?.newTicket === true) ||
        (item.ticket_id === action.payload.ticket_id && item?.newMessage === true)
          ? { ...item, newTicket: false, newMessage: false }
          : item
      );
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
          ? {
              ...item,
              latest_signal: action.payload.detail,
              updated_at: action.payload.updated_at,
              newMessage: true
            }
          : item
      );
    },
    ticketDetailsUpdateSend: (state: ITicket, action) => {
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        item.ticket_id === action.payload.ticket
          ? {
              ...item,
              latest_signal: action.payload.detail,
              updated_at: action.payload.updated_at,
              newMessage: false
            }
          : item
      );
    },
    remarDetailsUpdate: (state: ITicket, action) => {
      state.currentSignal = { ...state.currentSignal, remark: action.payload.remark };
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        item.ticket_id === action.payload.data
          ? {
              ...item,
              remark: action.payload.remark
            }
          : item
      );
    },
    ticketDelete: (state: ITicket, action) => {
      state.ticketState = state.ticketState.filter(
        (item: ITicketState) => action.payload !== item.ticket_id
      );
    },
    ticketWebSocket: (state: ITicket, action) => {
      state.ticketState = [action.payload, ...state.ticketState];
    },
    ticketAssignWebSocket: (state: ITicket, action) => {
      state.ticketState = state.ticketState.filter((item: any) =>
        item.ticket_id === action.payload.ticket_id
          ? state.ticketState
          : [action.payload, ...state.ticketState]
      );
    },
    ticketUpdate: (state: ITicket, action) => {
      state.currentSignal = action.payload;
    },
    ticketClean: (state: ITicket) => {
      state.ticketState = [];
      state.ticketStatus = 'none';
      state.ticketIsLoading = false;
      state.ticketError = '';
      state.ticketHasMore = false;
    },
    joinDetailsUpdate: (state: ITicket, action) => {
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        item.ticket_id === action.payload.data
          ? {
              ...item,
              status_type: action.payload.status.status_type,
              assigned_to:
                action.payload.status.status_type === 'Активное'
                  ? localStorage.getItem('user')
                  : item.assigned_to
            }
          : item
      );
    },
    AssignSaveDetailsUpdate: (state: ITicket, action) => {
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        item.ticket_id === action.payload.data
          ? {
              ...item,
              status_type: action.payload.status.status_type,
              assigned_to: `${action.payload.answer.first_name} ${action.payload.answer.last_name}`
            }
          : item
      );
    },
    dealTicketUpdate: (state: ITicket, action) => {
      state.currentSignal = {
        ...state.currentSignal,
        case_id: action.payload.dealAttachState?.id_claim_case,
        case_refid: action.payload.dealAttachState?.case_refid,
        case_status: action.payload.dealAttachState?.case_status,
        insured_dob: action.payload.dealAttachState?.dob_insured,
        insured_name: action.payload.dealAttachState?.fullname_insured
      };
      state.ticketState = state.ticketState.map((item: ITicketState) =>
        item.ticket_id === action.payload.ticketId
          ? {
              ...item,
              case_id: action.payload.dealAttachState?.id_claim_case,
              case_refid: action.payload.dealAttachState?.case_refid,
              case_status: action.payload.dealAttachState?.case_status,
              insured_dob: action.payload.dealAttachState?.dob_insured,
              insured_name: action.payload.dealAttachState?.fullname_insured
            }
          : item
      );
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
  ticketWebSocket,
  ticketDelete,
  ticketDetailsUpdateSend,
  ticketUpdate,
  signalSaveStart,
  remarDetailsUpdate,
  joinDetailsUpdate,
  ticketAssignWebSocket,
  AssignSaveDetailsUpdate,
  dealTicketUpdate
} = Tickets.actions;
export default Tickets.reducer;
