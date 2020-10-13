/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import { TextComponent } from '../../components/textComponent';
import { RootState } from '../../store/rootReducer';

const Wrapper = Styled.div``;

type IDeal = {};

export const DealComponent: React.FC<IDeal> = () => {
  const { dealAttachSaveError, dealAttachSaveIsLoading, dealAttachSaveState } = useSelector(
    (state: RootState) => state.SignalSlice
  );
  useEffect(() => {
    console.log(dealAttachSaveState);
  }, [dealAttachSaveState]);
  return (
    <Wrapper>
      <TextComponent>Info</TextComponent>
    </Wrapper>
  );
};
