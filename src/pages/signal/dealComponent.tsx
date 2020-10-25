/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import { TextComponent } from '../../components/textComponent';
import { RootState } from '../../store/rootReducer';

const Wrapper = Styled.div`
  margin: 1rem 0;
`;
const TextWrapper = Styled.div`
  /* display: flex; */
  padding-bottom: 0.5rem;
  span{
    color: grey;
    display: inline-block;
    padding-bottom: 0.2rem;
  }
`;
type IDeal = {
  currentSignal: any;
};

export const DealComponent: React.FC<IDeal> = () => {
  const { dealAttachSaveError, dealAttachSaveIsLoading, dealAttachSaveState } = useSelector(
    (state: RootState) => state.SignalSlice
  );
  const { currentSignal } = useSelector((state: RootState) => state.TicketSlice);
  useEffect(() => {
    console.log(currentSignal);
  }, [currentSignal]);
  return (
    <Wrapper>
      {currentSignal?.insured_name && (
        <TextWrapper>
          <span>ФИО:</span>
          <TextComponent>{currentSignal?.insured_name}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.case_id && (
        <TextWrapper>
          <span>ID дела:</span>
          <TextComponent>{currentSignal?.case_id}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.case_refid && (
        <TextWrapper>
          <span>Реферативный номер:</span>
          <TextComponent>{currentSignal?.case_refid}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.case_status && (
        <TextWrapper>
          <span>Текущий статус</span>
          <TextComponent> {currentSignal?.case_status}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.insured_dob && (
        <TextWrapper>
          <span>Дата рождения</span>
          <TextComponent>{currentSignal?.insured_dob}</TextComponent>
        </TextWrapper>
      )}
    </Wrapper>
  );
};
