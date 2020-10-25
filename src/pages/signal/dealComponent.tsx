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

export const DealComponent: React.FC<IDeal> = ({ currentSignal }) => {
  const { dealAttachSaveError, dealAttachSaveIsLoading, dealAttachSaveState } = useSelector(
    (state: RootState) => state.SignalSlice
  );
  useEffect(() => {
    console.log(dealAttachSaveState);
  }, [dealAttachSaveState]);
  return (
    <Wrapper>
      {currentSignal?.insured_name && (
        <TextWrapper>
          <span>insured_named:</span>
          <TextComponent>{currentSignal?.insured_name}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.case_id && (
        <TextWrapper>
          <span>case_id:</span>
          <TextComponent>{currentSignal?.case_id}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.case_refid && (
        <TextWrapper>
          <span>case_refid:</span>
          <TextComponent>{currentSignal?.case_refid}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.case_status && (
        <TextWrapper>
          <span>case_status:</span>
          <TextComponent> {currentSignal?.case_status}</TextComponent>
        </TextWrapper>
      )}
      {currentSignal?.insured_dob && (
        <TextWrapper>
          <span>insured_dob:</span>
          <TextComponent>{currentSignal?.insured_dob}</TextComponent>
        </TextWrapper>
      )}
    </Wrapper>
  );
};
