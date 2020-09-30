import { createSlice } from '@reduxjs/toolkit';
import { ISignal, ISignalData } from './signalType';

const initialState: ISignal = {
  signalState: [],
  signalStatus: 'none',
  signalIsLoading: false,
  signalError: '',

  currentSignal: [],

  sendSignalStatus: 'none',
  sendSignalIsLoading: false,
  sendSignalError: ''
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
      state.signalState = [...state.signalState, action.payload];
      state.sendSignalStatus = 'success';
      state.sendSignalIsLoading = false;
    },
    sendSignalError: (state: ISignal, action) => {
      state.sendSignalStatus = 'failed';
      state.sendSignalError = action.payload;
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
  sendSignalError
} = Signal.actions;
export default Signal.reducer;
