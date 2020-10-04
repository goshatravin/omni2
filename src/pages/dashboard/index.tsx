/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import Styled from 'styled-components';
import openSocket from 'socket.io-client';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Noty from 'noty';
import NavBarComponent from '../../components/navbarComponent';
import SignalContainer from '../signal/index';
import TicketContainer from '../ticket';
import { AddTicketWebSocket, UpdateTicketTextWebSocket } from '../ticket/ticketAction';
import { ITicketState } from '../ticket/ticketType';
import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';
import { RootState } from '../../store/rootReducer';
import { signalWebSocket } from '../signal/signalAction';
import { NewTicket, NewSignal, NewAssigne } from './socketHandler';
import { ISignalData } from '../signal/signalType';

type IDashboard = {};

const Wrapper = Styled.div`
  background: ${(props) => props.theme.backroundGrey};
`;
const DashboardPannel = Styled.div`
  display: flex;
  flex-direction: row;
  display: flex;
  height: calc(100vh - 64px);
`;
const Dashboard: React.FC<IDashboard> = () => {
  const dispatch = useDispatch();
  const { currentSignal, ticketIsOpen } = useSelector((state: RootState) => state.TicketSlice);
  const [message, setMessage] = useState<any>();
  const [currentBtn, setCurrentBtn] = useState<string>('4');

  useEffect(() => {
    // Message Close
    if (!ticketIsOpen && !_.isEmpty(message)) {
      dispatch(UpdateTicketTextWebSocket(message));
      // Message Open
    } else if (ticketIsOpen && !_.isEmpty(message)) {
      if (message?.ticket === currentSignal.ticket_id) {
        dispatch(signalWebSocket(message));
        dispatch(UpdateTicketTextWebSocket(message));
      }
      dispatch(UpdateTicketTextWebSocket(message));
    }
    return () => {
      setMessage(undefined);
    };
  }, [message, ticketIsOpen]);

  const handleStatusChange = useCallback(
    (data) => {
      if (data.new_ticket_registered) {
        const { new_ticket_registered } = data;
        NewTicket(dispatch, new_ticket_registered, currentBtn);
      } else if (data.new_incoming_signal) {
        const { new_incoming_signal } = data;
        setMessage(new_incoming_signal);
        NewSignal(dispatch, new_incoming_signal);
      } else if (data.new_assignee_request) {
        const { new_assignee_request } = data;
        NewAssigne(dispatch, new_assignee_request, currentBtn);
      } else if (data.new_ticket_assigned) {
        const { new_ticket_assigned } = data;
        console.log(data);
      } else {
        console.log(data);
      }
    },
    [currentBtn]
  );
  useEffect(() => {
    const ws = new WebSocket('ws://10.30.200.5:80/notifications/');
    ws.onmessage = (hook) => {
      const data = JSON.parse(hook.data);
      handleStatusChange(data);
      const { channel_name } = JSON.parse(hook?.data);
      const wsJson = {
        channel_name,
        token: localStorage.getItem('token')
      };
      if (channel_name) {
        ws.send(JSON.stringify(wsJson));
      }
    };
    return () => {
      ws.close();
    };
  }, [handleStatusChange]);
  return (
    <Wrapper>
      <NavBarComponent />
      <DashboardPannel>
        <TicketContainer currentBtn={currentBtn} setCurrentBtn={setCurrentBtn} />
        <SignalContainer />
      </DashboardPannel>
    </Wrapper>
  );
};

export default Dashboard;
