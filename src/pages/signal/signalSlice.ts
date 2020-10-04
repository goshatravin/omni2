import { createSlice } from '@reduxjs/toolkit';
import { startCase } from 'lodash';
import { ISignal, ISignalData } from './signalType';

const initialState: ISignal = {
  signalState: [],
  signalStatus: 'none',
  signalIsLoading: false,
  signalError: '',

  currentSignal: [],

  sendSignalStatus: 'none',
  sendSignalIsLoading: false,
  sendSignalError: '',

  signalArchiveStatus: 'none',
  signalArchiveIsLoading: false,
  signalArchiveError: '',

  joinTicketStatus: 'none',
  joinTicketIsLoading: false,
  joinTicketError: '',

  remarkTicketStatus: 'none',
  remarkTicketIsLoading: false,
  remarkTicketError: '',

  assigmentTicketStatus: 'none',
  assigmentTicketIsLoading: false,
  assigmentTicketError: ''
};

const Signal = createSlice({
  name: 'signal',
  initialState,
  reducers: {
    signalFetchingStart: (state: ISignal) => {
      state.signalStatus = 'requesting';
      state.signalIsLoading = true;
    },
    signalFetchingComplete: (state: ISignal, action) => {
      state.signalStatus = 'success';
      state.signalIsLoading = false;
      state.signalState = action.payload;
    },
    signalFetchingError: (state: ISignal, action) => {
      state.signalStatus = 'failed';
      state.signalIsLoading = false;
      state.signalError = action.payload;
    },
    signalClean: (state: ISignal) => {
      state.signalState = [];
      state.signalStatus = 'none';
      state.signalIsLoading = false;
      state.signalError = '';
    },
    sendSignalStart: (state: ISignal) => {
      state.sendSignalStatus = 'requesting';
      state.sendSignalIsLoading = true;
    },
    sendSignalComplete: (state: ISignal, action) => {
      state.signalState = [action.payload];
      state.sendSignalStatus = 'success';
      state.sendSignalIsLoading = false;
    },
    sendSignalError: (state: ISignal, action) => {
      state.sendSignalStatus = 'failed';
      state.sendSignalError = action.payload;
    },
    signalArchiveStart: (state: ISignal) => {
      state.signalArchiveStatus = 'requesting';
      state.signalArchiveIsLoading = true;
    },
    signalArchiveComplete: (state: ISignal) => {
      state.signalArchiveStatus = 'success';
      state.signalArchiveIsLoading = false;
    },
    signalArchiveError: (state: ISignal, action) => {
      state.signalArchiveStatus = 'failed';
      state.signalArchiveIsLoading = false;
      state.signalArchiveError = action.payload;
    },
    joinTicketStart: (state: ISignal) => {
      state.joinTicketStatus = 'requesting';
      state.joinTicketIsLoading = true;
    },
    joinTicketComplete: (state: ISignal) => {
      state.joinTicketStatus = 'success';
      state.joinTicketIsLoading = false;
    },
    joinTicketError: (state: ISignal, action) => {
      state.remarkTicketStatus = 'failed';
      state.remarkTicketIsLoading = false;
      state.remarkTicketError = action.payload;
    },
    remarkTicketStart: (state: ISignal) => {
      state.remarkTicketStatus = 'requesting';
      state.remarkTicketIsLoading = true;
    },
    remarkTicketComplete: (state: ISignal) => {
      state.remarkTicketStatus = 'success';
      state.remarkTicketIsLoading = false;
    },
    remarkTicketError: (state: ISignal, action) => {
      state.remarkTicketStatus = 'failed';
      state.remarkTicketIsLoading = false;
      state.remarkTicketError = action.payload;
    },
    remarkClean: (state: ISignal) => {
      state.remarkTicketStatus = 'none';
      state.remarkTicketIsLoading = false;
      state.remarkTicketError = '';
    },
    webSocketMessage: (state: ISignal, action) => {
      state.signalState = [...state.signalState, action.payload];
      state.sendSignalIsLoading = false;
    },
    assigmentStart: (state: ISignal) => {
      state.assigmentTicketStatus = 'requesting';
      state.assigmentTicketIsLoading = true;
    },
    assigmentComplete: (state: ISignal) => {
      state.assigmentTicketStatus = 'success';
      state.assigmentTicketIsLoading = false;
    },
    assigmentError: (state: ISignal, action) => {
      state.assigmentTicketStatus = 'failed';
      state.assigmentTicketIsLoading = false;
      state.assigmentTicketError = action.payload;
    }
  }
});
export const {
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
} = Signal.actions;
export default Signal.reducer;
