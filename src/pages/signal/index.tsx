/* eslint-disable camelcase */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignInComponent from '../signIn/signInComponent';
import { ISignalContainer } from './signalType';
import SignalComponent from './signalComponent';
import { fetchSignals, sendSignal } from './signalAction';
import { RootState } from '../../store/rootReducer';

const SignalContainer: React.FC<ISignalContainer> = () => {
  const dispatch = useDispatch();

  const { currentSignal, ticketIsOpen } = useSelector((state: RootState) => state.TicketSlice);
  const {
    signalIsLoading,
    signalError,
    signalState,
    signalStatus,
    sendSignalIsLoading
  } = useSelector((state: RootState) => state.SignalSlice);

  const [signalPage, setSignalPage] = useState<number>(0);

  const bottomSignalRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);
  const handleSendMessage = (data: any) => {
    const { ticket_id } = currentSignal;
    dispatch(sendSignal(ticket_id, data));
  };

  const RenderData = () =>
    ticketIsOpen ? (
      <SignalComponent
        sendSignalIsLoading={sendSignalIsLoading}
        currentSignal={currentSignal}
        signalIsLoading={signalIsLoading}
        signalState={signalState}
        bottomSignalRef={bottomSignalRef}
        handleSendMessage={handleSendMessage}
      />
    ) : (
      <p />
    );
  return signalIsLoading ? <p>ЗАГРУЗКА</p> : <RenderData />;
};

export default SignalContainer;
