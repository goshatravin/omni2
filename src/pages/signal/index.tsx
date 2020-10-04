/* eslint-disable camelcase */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignInComponent from '../signIn/signInComponent';
import { ISignalContainer } from './signalType';
import SignalComponent from './signalComponent';
import {
  fetchSignals,
  joinTicket,
  sendAssigment,
  sendSignal,
  sendSignalToArchive
} from './signalAction';
import { RootState } from '../../store/rootReducer';
import SweetAlertComponent from '../../components/sweetAlertComponent';
import { CloseSignal, deleteTicket, updateTicket } from '../ticket/ticketAction';

const SignalContainer: React.FC<ISignalContainer> = () => {
  const dispatch = useDispatch();

  const { currentSignal, ticketIsOpen } = useSelector((state: RootState) => state.TicketSlice);
  const {
    signalIsLoading,
    signalError,
    signalState,
    signalStatus,
    sendSignalIsLoading,
    signalArchiveStatus,
    signalArchiveIsLoading,
    signalArchiveError,
    joinTicketStatus,
    joinTicketIsLoading,
    joinTicketError,
    assigmentTicketStatus,
    assigmentTicketIsLoading,
    assigmentTicketError
  } = useSelector((state: RootState) => state.SignalSlice);

  const [signalPage, setSignalPage] = useState<number>(0);
  // const [remarkChange, setRemarkChange] = useState<boolean>(false);
  const bottomSignalRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);
  const handleSendMessage = (data: any) => {
    const { ticket_id } = currentSignal;
    dispatch(sendSignal(ticket_id, data));
  };
  const handleArchive = (data: any) => {
    // console.log(data);
    dispatch(sendSignalToArchive(data));
  };
  const handleAssigment = (data: any) => {
    dispatch(sendAssigment(data));
  };
  const handleDeal = (data: any) => {
    console.log(data);
  };

  const handleJoinTicket = (data: any) => {
    dispatch(joinTicket(data));
  };
  useEffect(() => {
    if (assigmentTicketStatus === 'failed') {
      SweetAlertComponent({
        title: 'Ошибка',
        text: assigmentTicketError,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
    if (assigmentTicketStatus === 'success') {
      SweetAlertComponent({
        title: 'Успешно',
        text: 'Запрос на изменение отвественного лица, успешно отправлен',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
  }, [assigmentTicketStatus]);
  useEffect(() => {
    if (signalArchiveStatus === 'failed') {
      SweetAlertComponent({
        title: 'Ошибка',
        text: signalArchiveError,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
    if (signalArchiveStatus === 'success') {
      SweetAlertComponent({
        title: 'Успешно',
        text: 'Тикет заархивирован',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
      dispatch(CloseSignal());
      // dispatch(deleteTicket(currentSignal.ticket_id));
    }
  }, [signalArchiveStatus]);
  // Join Ticket
  useEffect(() => {
    if (joinTicketStatus === 'failed') {
      SweetAlertComponent({
        title: 'Ошибка',
        text: joinTicketError,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
    if (joinTicketStatus === 'success') {
      SweetAlertComponent({
        title: 'Успешно',
        text: 'Вы успешно присоеденились к тиккету',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
      dispatch(updateTicket(currentSignal.ticket_id));
    }
  }, [joinTicketStatus]);
  const RenderData = () =>
    ticketIsOpen ? (
      <SignalComponent
        sendSignalIsLoading={sendSignalIsLoading}
        currentSignal={currentSignal}
        signalIsLoading={signalIsLoading}
        signalState={signalState}
        bottomSignalRef={bottomSignalRef}
        handleSendMessage={handleSendMessage}
        handleArchive={handleArchive}
        handleAssigment={handleAssigment}
        handleDeal={handleDeal}
        handleJoinTicket={handleJoinTicket}
        joinTicketIsLoading={joinTicketIsLoading}
        // handleRemarkChange={handleRemarkChange}
        // remarkChange={remarkChange}
        // handleRemarkClose={handleRemarkClose}
      />
    ) : (
      <p />
    );
  return signalIsLoading ? <p /> : <RenderData />;
};

export default SignalContainer;
