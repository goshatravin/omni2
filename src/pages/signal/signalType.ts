/* eslint-disable camelcase */
import { signalType } from '../ticket/ticketType';

export type IISignalComponent = {
  handleAttachUser: any;
  currentSignal: any;
  signalIsLoading: boolean;
  sendSignalIsLoading: boolean;
  signalState: any;
  bottomSignalRef: any;
  handleSendMessage: any;
  handleArchive: any;
  handleAssigment: any;
  handleDeal: any;
  handleJoinTicket: any;
  joinTicketIsLoading: boolean;
  // handleRemarkChange: any;
  // remarkChange: boolean;
  // handleRemarkClose: any;
};
export type ISignalContainer = {};

export type ISignal = {
  dealAttachSaveState: any;
  dealAttachSaveIsLoading: boolean;
  dealAttachSaveError: string;
  dealAttachState: any;
  dealAttachIsLoading: boolean;
  dealAttachError: string;
  signalState: any;
  signalStatus: string;
  signalIsLoading: boolean;
  signalError: string;
  currentSignal: any;
  sendSignalStatus: string;
  sendSignalIsLoading: boolean;
  sendSignalError: string;
  signalArchiveStatus: string;
  signalArchiveIsLoading: boolean;
  signalArchiveError: string;
  joinTicketStatus: string;
  joinTicketIsLoading: boolean;
  joinTicketError: string;
  remarkTicketStatus: string;
  remarkTicketIsLoading: boolean;
  remarkTicketError: string;
  assigmentTicketStatus: string;
  assigmentTicketIsLoading: boolean;
  assigmentTicketError: string;
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
