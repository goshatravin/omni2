/* eslint-disable camelcase */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import SignInComponent from '../signIn/signInComponent';
import { ISignalContainer } from './signalType';
import SignalComponent from './signalComponent';
import {
  AttachDeal,
  AttachSaveDeal,
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
  const { userListState } = useSelector((state: RootState) => state.SignInSlice);
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
    assigmentTicketError,
    dealAttachError,
    dealAttachIsLoading,
    dealAttachState
  } = useSelector((state: RootState) => state.SignalSlice);

  const [signalPage, setSignalPage] = useState<number>(0);
  // const [remarkChange, setRemarkChange] = useState<boolean>(false);
  const bottomSignalRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);
  useEffect(() => {
    console.log(dealAttachState);
    if (dealAttachState && !dealAttachIsLoading) {
      Swal.fire({
        title: 'Прекрепить данное страховое дело?',
        html: `
        <br/><pre><code>Дата рождения - ${dealAttachState?.dob_insured}</code></pre><br/>
              <pre><code>Имя - ${dealAttachState?.fullname_insured}</code></pre><br/>
              <pre><code>ID -${dealAttachState?.id_claim_case}</code></pre>
            `,
        showCancelButton: true,
        cancelButtonText: 'Нет',
        confirmButtonText: 'Несомненно!'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          dispatch(AttachSaveDeal(currentSignal?.ticket_id, dealAttachState?.id_claim_case));
        }
      });
    }
  }, [dealAttachState]);
  const handleAttachUser = (data: any) => {
    console.log(userListState);
    const userList = userListState.map((item: any) => `${item.first_name} ${item.last_name}`);
    if (userListState.length !== 0) {
      Swal.mixin({
        input: 'select',
        inputOptions: {
          userList
        },
        confirmButtonText: 'Отправить',
        showCancelButton: true
        // inputPlaceholder: 'Please select'
      })
        .queue([
          {
            text: 'Выбирите оператора,которого хотите назначить отвественным'
          }
        ])
        .then((response: any) => {
          console.log(response);
          if (response.value) {
            const answer: any = userListState.find(
              (item, index) => index === Number(response.value)
            );
            console.log(answer);
            dispatch(sendAssigment(data, '2', answer));
          }
        });
    }
    // console.log(data);
  };
  const handleSendMessage = (data: any) => {
    const { ticket_id } = currentSignal;
    dispatch(sendSignal(ticket_id, data));
  };
  const handleArchive = (data: any) => {
    // console.log(data);
    dispatch(sendSignalToArchive(data));
  };
  const handleAssigment = (data: any) => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Отправить',
      showCancelButton: true
      // inputPlaceholder: 'Please select'
    })
      .queue([
        {
          text: 'Причина запроса'
        }
      ])
      .then((response: any) => {
        console.log(response);
        if (response.value) {
          dispatch(sendAssigment(data, '4', response.value[0]));
        }
      });
  };
  const handleDeal = (data: any) => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    })
      .queue([
        {
          text: 'Введите реферативный номер'
        },
        {
          text: 'Введите Серийный номер'
        }
      ])
      .then((result: any) => {
        console.log(result);
        if (result.value) {
          dispatch(AttachDeal(result.value[0], result.value[1]));
        }
      });
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
        handleAttachUser={handleAttachUser}
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
