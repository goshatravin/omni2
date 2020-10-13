/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TicketComponent from './ticketComponent';
import fetchTickets, { cleanTickets, saveSignal } from './ticketAction';
import { InfinityScroll } from './ticketFunctions';
import { RootState } from '../../store/rootReducer';
import { ticketClean } from './ticketSlice';
import { IItem, IStatus, ITicketContainer, signalType } from './ticketType';
import { fetchSignals } from '../signal/signalAction';

const TicketContainer: React.FC<ITicketContainer> = ({ setCurrentBtn, currentBtn }) => {
  const dispatch = useDispatch();
  const { ticketIsLoading, ticketHasMore } = useSelector((state: RootState) => state.TicketSlice);
  const { signalIsLoading } = useSelector((state: RootState) => state.SignalSlice);
  const [page, setPage] = useState<number>(1);
  // const [signalPage, setSignalPage] = useState<number>(1);
  // const [currentBtn, setCurrentBtn] = useState<string>('4');

  const [filter, setFilter] = useState<IStatus>({
    status_type_id: null,
    assigned_to: null
  });
  const [handleSearchChange, setHandleSearchChange] = useState<any>('');
  const [currentTicket, setCurrentTicket] = useState<any>(null);
  const lastTicket = InfinityScroll(ticketIsLoading, setPage, ticketHasMore);
  // useEffect(() => {
  //   console.log(handleSearchChange);
  //   setCurrentBtn('4');
  //   dispatch(cleanTickets());
  // }, [handleSearchChange]);
  const handleCleanSearch = () => {
    setHandleSearchChange('');
    setPage(1);
    setCurrentBtn('4');
    setFilter({
      status_type_id: null,
      assigned_to: null
    });
    dispatch(cleanTickets());
    dispatch(fetchTickets(page, filter.status_type_id, filter.assigned_to));
  };
  const sendSearch = () => {
    setPage(1);
    setCurrentBtn('4');
    setFilter({
      status_type_id: null,
      assigned_to: null
    });
    dispatch(cleanTickets());
    console.log(handleSearchChange);
    dispatch(fetchTickets(page, filter.status_type_id, filter.assigned_to, handleSearchChange));
  };
  const handleFilterTicket = (id: any, item: IItem, name: any) => {
    setHandleSearchChange('');
    if (currentBtn !== id) {
      setPage(1);
      setCurrentBtn(id);
      dispatch(cleanTickets());
      if (name.type === 'status_type_id') {
        setFilter({
          status_type_id: name.filter,
          assigned_to: null
        });
      } else if (name.type === 'assigned_to') {
        setFilter({
          assigned_to: item,
          status_type_id: null
        });
      } else {
        setFilter({
          status_type_id: null,
          assigned_to: null
        });
      }
    }
  };
  const openSignal = (data: signalType) => {
    if (!signalIsLoading) {
      dispatch(fetchSignals(data));
      dispatch(saveSignal(data));
    }
  };
  useEffect(() => {
    if (!ticketIsLoading) {
      dispatch(fetchTickets(page, filter.status_type_id, filter.assigned_to, handleSearchChange));
    }
  }, [page, filter.status_type_id, filter.assigned_to]);

  return (
    <TicketComponent
      handleCleanSearch={handleCleanSearch}
      sendSearch={sendSearch}
      openSignal={openSignal}
      setHandleSearchChange={setHandleSearchChange}
      handleSearchChange={handleSearchChange}
      lastTicket={lastTicket}
      handleFilterTicket={handleFilterTicket}
      currentBtn={currentBtn}
    />
  );
};

export default TicketContainer;
