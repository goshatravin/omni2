/* eslint-disable camelcase */
export type ITicket = {
  ticketState: any;
  ticketStatus: string;
  ticketIsLoading: boolean;
  ticketError: string;
  ticketHasMore: boolean;
  currentSignal: any;
  ticketIsOpen: boolean;
};
export type ITicketState = {
  assigned_to?: string;
  assigned_to_id?: string;
  case?: string;
  case_id?: string;
  case_status?: string;
  channel?: string;
  channel_type_id?: string;
  created_at?: string;
  created_by?: string;
  customer?: string;
  insured_dob?: string;
  latest_signal?: string;
  page_index?: number;
  remark?: string;
  status_type?: string;
  status_type_id?: string;
  ticket_id: string;
  updated_at?: string;
  newTicket?: boolean;
  newMessage?: true;
};
export type IItem = {
  filter: number | string;
  id: string;
  name: string;
  type: string;
};

export type IStatus = {
  status_type_id: any;
  assigned_to: any;
};
export type ITicketContainer = {
  currentBtn: string;
  setCurrentBtn: React.Dispatch<React.SetStateAction<string>>;
};
export type ITicketComponent = {
  lastTicket: any;
  handleFilterTicket: any;
  currentBtn: string;
  openSignal: (data: signalType) => void;
  setHandleSearchChange: any;
  handleSearchChange: string;
  sendSearch: any;
  handleCleanSearch: any;
};

export type signalType = {
  assigned_to?: string;
  case?: string;
  case_id?: string;
  case_status?: string;
  channel?: string;
  channel_type_id?: string;
  created_at?: string;
  created_by?: string;
  customer?: string;
  insured_dob?: string;
  latest_signal?: string;
  page_index?: number;
  remark?: string;
  status_type?: string;
  ticket_id?: string;
  updated_at?: string;
};
