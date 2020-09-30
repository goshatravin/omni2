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

const TicketContainer: React.FC<ITicketContainer> = () => {
  const dispatch = useDispatch();
  const { ticketIsLoading, ticketHasMore } = useSelector((state: RootState) => state.TicketSlice);
  const [page, setPage] = useState<number>(1);
  // const [signalPage, setSignalPage] = useState<number>(1);
  const [currentBtn, setCurrentBtn] = useState<string>('4');

  const [filter, setFilter] = useState<IStatus>({
    status_type_id: null,
    assigned_to: null
  });
  const [currentTicket, setCurrentTicket] = useState<any>(null);
  const lastTicket = InfinityScroll(ticketIsLoading, setPage, ticketHasMore);

  const handleFilterTicket = (id: any, item: IItem, name: any) => {
    if (currentBtn !== id) {
      setPage(1);
      setCurrentBtn(id);
      dispatch(cleanTickets());
      if (item.type === 'status_type_id') {
        setFilter({
          status_type_id: item.filter,
          assigned_to: null
        });
      } else if (item.type === 'assigned_to') {
        setFilter({
          assigned_to: item.filter,
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
    dispatch(fetchSignals(data));
    dispatch(saveSignal(data));
  };
  useEffect(() => {
    if (!ticketIsLoading) {
      dispatch(fetchTickets(page, filter.status_type_id, filter.assigned_to));
    }
  }, [page, filter.status_type_id, filter.assigned_to]);

  return (
    <TicketComponent
      openSignal={openSignal}
      lastTicket={lastTicket}
      handleFilterTicket={handleFilterTicket}
      currentBtn={currentBtn}
    />
  );
};

export default TicketContainer;
