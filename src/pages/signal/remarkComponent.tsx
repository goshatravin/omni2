/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import ButtonComponent from '../../components/buttonComponent';
import InputComponent from '../../components/inputComponent';
import { LoaderComponent } from '../../components/loaderComponent';
import SweetAlertComponent from '../../components/sweetAlertComponent';
import { RootState } from '../../store/rootReducer';
import Edit from '../../theme/svg/pencil.svg';
import { ITicketState } from '../ticket/ticketType';
import { remarkCleanTicket, remarkTicket } from './signalAction';

const RemarkBox = Styled.div`
padding-top: 20px;
display: flex;
/* border: 1px solid black; */
align-items: center;
`;
const RemarkButton: any = Styled.div`
cursor: pointer;
width: 35px;
padding: 0 10px;
/* border: 1px solid black; */
display: flex;
align-items: center;
  img{
    max-width: 35px;
    cursor: pointer;
  }
`;
const RemarkText = Styled.div`
flex: 1;`;
const RemarkInputWrapper = Styled.div`
  display: flex;
  /* justify-content:center; */
  align-items:center;
  flex-direction: column;
`;
const ButtonRemarkWrapper = Styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;

`;
const ButtonRemark = Styled.button`
cursor: pointer;
  width: 150px;
  /* padding: 10px 0; */
  height: 3rem;
  border-radius: 5px;
  border: none;
  background: white;
  box-shadow: 0px 1px 5px #DFE1E5;
  &:nth-child(1) {
    background:#2f80eb;
    p{
      color: white;
    }
  };
  &:disabled {
    background: #aac1e0;
    cursor: default;
  }
`;
type IRemark = {
  currentSignal?: ITicketState;
};
export const RemarkComponent: React.FC<IRemark> = ({ currentSignal }) => {
  const dispatch = useDispatch();
  const [remarkChange, setRemarkChange] = useState<boolean>(false);
  const [submitBtn, setSubmitBtn] = useState<boolean>(false);
  const [remarkValue, setRemarkValue] = useState<string>('');
  const { remarkTicketStatus, remarkTicketIsLoading, remarkTicketError } = useSelector(
    (state: RootState) => state.SignalSlice
  );
  console.log(remarkChange);
  const cleanComponent = () => {
    setRemarkValue('');
    // setRemarkChange(false);
    setSubmitBtn(false);
  };
  const handleRemarkClose = () => {
    setRemarkChange(false);
    if (currentSignal?.remark) {
      setRemarkValue(currentSignal?.remark);
    }
  };
  const handleRemarkChange = (data: any) => {
    setRemarkChange(true);
  };
  const handelSendRemark = () => {
    if (currentSignal?.ticket_id) {
      setSubmitBtn(true);
      dispatch(remarkTicket(currentSignal?.ticket_id, remarkValue));
    }
  };
  useEffect(() => {
    if (currentSignal?.remark) {
      setRemarkValue(currentSignal?.remark);
    }
    return () => {
      cleanComponent();
    };
  }, [currentSignal]);
  useEffect(() => {
    if (remarkTicketStatus === 'failed') {
      SweetAlertComponent({
        title: 'Ошибка',
        text: remarkTicketError,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
    if (remarkTicketStatus === 'success') {
      SweetAlertComponent({
        title: 'Успешно',
        text: 'Ремарка успешно обновлена',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
      dispatch(remarkCleanTicket());
    }
  }, [remarkTicketStatus]);
  return (
    <RemarkBox>
      {remarkChange ? (
        <RemarkInputWrapper>
          <InputComponent
            placeholder="Мы ждем вашу ремарку"
            name="remark"
            type="text"
            value={remarkValue}
            onChange={(e) => setRemarkValue(e.target.value)}
          />
          <ButtonRemarkWrapper>
            <ButtonRemark
              type="button"
              disabled={remarkValue === currentSignal?.remark || remarkTicketIsLoading}
              onClick={() => handelSendRemark()}
            >
              {remarkTicketIsLoading && <LoaderComponent />}
              {!remarkTicketIsLoading && <p>Изменить</p>}
            </ButtonRemark>
            <ButtonRemark type="button" onClick={() => handleRemarkClose()}>
              Отменить
            </ButtonRemark>
          </ButtonRemarkWrapper>
        </RemarkInputWrapper>
      ) : (
        <>
          <RemarkText>
            <p>
              {currentSignal?.remark
                ? currentSignal?.remark
                : ' много сообщение тут много много сообщение тут многомного сообщение тут много'}
            </p>
          </RemarkText>
          <RemarkButton type="button" onClick={() => handleRemarkChange(currentSignal?.remark)}>
            <img src={Edit} alt="Edit" />
          </RemarkButton>
        </>
      )}
    </RemarkBox>
  );
};
