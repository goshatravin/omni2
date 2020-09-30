/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Viber from '../../theme/messengers/1.png';
import Skype from '../../theme/messengers/2.png';
import Telegram from '../../theme/messengers/3.png';
import Whatsup from '../../theme/messengers/4.png';

export const InfinityScroll = (loading: boolean, setFunction: any, isMore: boolean) => {
  const observer = useRef<any>();
  const lastTicektRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && isMore) {
            setFunction((prevPage: any) => prevPage + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, isMore]
  );
  return lastTicektRef;
};

export const MessangerImgSwitch = (id?: string) => {
  switch (id) {
    case '1':
      return Viber;
    case '2':
      return Skype;
    case '3':
      return Telegram;
    case '4':
      return Whatsup;
    default:
      return 'noImg';
  }
};

export const buttonData = [
  { id: '4', filter: '', name: 'Все' },
  { id: '1', filter: 1, type: 'assigned_to', name: 'Мои' },
  { id: '2', filter: 1, type: 'status_type_id', name: 'Новые' },
  { id: '3', filter: [2, 4], type: 'status_type_id', name: 'В очереди' }
];
