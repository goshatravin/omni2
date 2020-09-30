/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import openSocket from 'socket.io-client';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
import Noty from 'noty';
import NavBarComponent from '../../components/navbarComponent';
import SignalContainer from '../signal/index';
import TicketContainer from '../ticket';
import { AddTicketWebSocket, UpdateTicketTextWebSocket } from '../ticket/ticketAction';
// import SweetAlertComponent from '../../components/sweetAlertComponent';
import { ITicketState } from '../ticket/ticketType';
import 'noty/lib/noty.css';
// import 'noty/lib/themes/mint.css';
import 'noty/lib/themes/relax.css';
import { RootState } from '../../store/rootReducer';
import { signalWebSocket } from '../signal/signalAction';
// import 'noty/lib/themes/sunset.css';

type IDashboard = {};

const Wrapper = Styled.div`
  background: ${(props) => props.theme.backroundGrey};
`;
const DashboardPannel = Styled.div`
  display: flex;
  flex-direction: row;
  display: flex;
  height: calc(100vh - 64px);
  /* padding-bottom: 10px; */
`;
const Dashboard: React.FC<IDashboard> = () => {
  const dispatch = useDispatch();
  const { currentSignal } = useSelector((state: RootState) => state.TicketSlice);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  useEffect(() => {
    setEmpty(_.isEmpty(currentSignal));
  }, [currentSignal]);
  useEffect(() => {
    if (isEmpty) {
      console.log('zarkito', message);
      dispatch(UpdateTicketTextWebSocket(message));
    } else {
      console.log('otrkito', message);
      if (message?.ticket === currentSignal.ticket_id) {
        dispatch(signalWebSocket(message));
      }
      dispatch(UpdateTicketTextWebSocket(message));
    }
  }, [message]);
  const ws = new WebSocket('ws://10.30.200.5:80/notifications/');
  useEffect(() => {
    ws.onopen = function (hook) {
      console.log('connected', hook);
    };
    ws.onmessage = function (hook) {
      console.log(hook);
      const data = JSON.parse(hook.data);
      // new ticket
      if (data.new_ticket_registered) {
        const { new_ticket_registered } = data;
        dispatch(AddTicketWebSocket(new_ticket_registered));
        new Noty({
          theme: 'relax',
          type: 'alert',
          text: 'Зарегестрирован новый тикет'
        }).show();
      } else if (data.new_incoming_signal) {
        const { new_incoming_signal } = data;
        console.log(new_incoming_signal);
        // dispatch(AddNewMessageWebSocket(message_sent));
        setMessage(new_incoming_signal);
        new Noty({
          theme: 'relax',
          type: 'alert',
          text: 'Новое сообщение'
        }).show();
      } else {
        console.log(data);
      }
      const { channel_name } = JSON.parse(hook?.data);
      const wsJson = {
        channel_name,
        token: localStorage.getItem('token')
      };
      if (channel_name) {
        ws.send(JSON.stringify(wsJson));
      }
    };
  }, []);
  return (
    <Wrapper>
      <NavBarComponent />
      <DashboardPannel>
        <TicketContainer />
        <SignalContainer />
      </DashboardPannel>
    </Wrapper>
  );
};

export default Dashboard;
