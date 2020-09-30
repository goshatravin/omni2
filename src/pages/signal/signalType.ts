/* eslint-disable camelcase */
import { signalType } from '../ticket/ticketType';

export type IISignalComponent = {
  currentSignal: any;
  signalIsLoading: boolean;
  sendSignalIsLoading: boolean;
  signalState: any;
  bottomSignalRef: any;
  handleSendMessage: any;
};
export type ISignalContainer = {};

export type ISignal = {
  signalState: any;
  signalStatus: string;
  signalIsLoading: boolean;
  signalError: string;
  currentSignal: any;
  sendSignalStatus: string;
  sendSignalIsLoading: boolean;
  sendSignalError: string;
};

export type ISignalData = {
  signal_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: null;
  customer_name?: null;
  ticket?: string;
  direction_type?: string;
  content_type?: string;
  signal_status_type?: string;
  detail?: string;
};
