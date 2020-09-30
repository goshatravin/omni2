/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
/* eslint-disable array-callback-return */
/* eslint-disable implicit-arrow-linebreak */
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import Styled from 'styled-components';
import InputComponent from '../../components/inputComponent';
import { LoaderComponent } from '../../components/loaderComponent';
import Send from '../../theme/svg/send.svg';
import Close from '../../theme/svg/cancel.svg';

import { signalType } from '../ticket/ticketType';

import { IISignalComponent, ISignalData } from './signalType';
import { CloseSignal } from '../ticket/ticketAction';
import { useDispatch } from 'react-redux';

const Wrapper = Styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 0.5; */
  width: 600px;

`;
const Header = Styled.div`
  border-bottom: 1px solid #DFE1E5;
  border-left: 1px solid #DFE1E5;
  border-right: 1px solid #DFE1E5;
  padding: 2rem  1.5rem;
  display: flex;
  justify-content: space-between;
`;
const ChatWrapper = Styled.div`
    padding: 0.5rem;
    overflow-y: scroll;
    height: 100%;

`;
const HeaderWrapper = Styled.div`
  /* padding: 0 1rem; */
`;
const ChatItem: any = Styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.1rem;
  align-items: ${(props: any) => (props.name === '1' ? 'flex-start' : 'flex-end')};
  /* text-align: ${(props: any) => (props.name === '1' ? 'left' : 'right')}; */
  p {
    font-size: 16px;
    line-height: 16px;
    background: ${(props: any) => (props.name === '1' ? 'white' : '#266cd7')};
    color: ${(props: any) => (props.name === '1' ? '#393F47' : 'white')};
    display: inline-block;
    border: 1px solid #ebeff3;
    border-radius: ${(props: any) =>
      props.name === '1' ? '20px 10px 10px 0px' : '10px 20px 0px 10px'}; ;
    margin:${(props: any) =>
      props.name === '1' ? '1rem 4rem 0.2rem 0rem' : '1rem 0rem 0.2rem 4rem'};
    padding: 0.7rem;
  }
  span{
    font-size: 10px;
  }
  `;
//
const InputWrapper = Styled.div`
width:100%;
display: flex;
/* border: 1px solid black; */
position: relative;
  button{
    border:none;
    background: none;
    outline: none;
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    z-index: 9;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const UpdateLoader = Styled(LoaderComponent)`
  /* border: 1px solid black; */
  top: -15px;
  position: absolute;
  left: -15px;
  &:after {
  border-color: #DFE1E5 transparent #DFE1E5 transparent;
  }
`;
const CloseButton = Styled.div`
  img{
    width: 13px;
    height: 13px;
    cursor:pointer;
  }
`;
const Form = Styled.form``;
const SignalComponent: React.FC<IISignalComponent> = ({
  currentSignal,
  signalIsLoading,
  signalState,
  bottomSignalRef,
  handleSendMessage,
  sendSignalIsLoading
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, formState } = useForm<any>({
    defaultValues: {
      message: ''
    },
    mode: 'all'
  });
  const headerChat = (
    <Header>
      {signalState.length > 0 ? <p>{currentSignal?.customer}</p> : <p>PUSTO</p>}
      <CloseButton onClick={() => dispatch(CloseSignal())}>
        <img src={Close} alt="close" />
      </CloseButton>
    </Header>
  );
  const chatHistory = signalState.map((item: ISignalData, index: number) =>
    index === signalState.length - 1 ? (
      <ChatItem ref={bottomSignalRef} key={item.signal_id} name={item.direction_type}>
        <p>
          {/* {index} */}
          {item.detail}
          {/* {item.created_at} */}
        </p>
        <span>{moment(item.created_at).format('DD-MM-YY  hh:mm')}</span>
      </ChatItem>
    ) : (
      <ChatItem key={item.signal_id} name={item.direction_type}>
        <p>
          {/* {index} */}
          {item.detail}
          {/* {item.created_at} */}
        </p>
        <span>{moment(item.created_at).format('DD-MM-YY  hh:mm')}</span>
      </ChatItem>
    )
  );
  return (
    <Wrapper>
      <HeaderWrapper>{headerChat}</HeaderWrapper>
      <ChatWrapper>{chatHistory}</ChatWrapper>
      <Form onSubmit={handleSubmit(handleSendMessage)}>
        <InputWrapper>
          <InputComponent
            disabled={sendSignalIsLoading}
            flex="1"
            register={register({
              required: 'обязательно',
              minLength: {
                value: 1,
                message: 'хотябы один символ'
              }
            })}
            name="message"
            type="text"
            placeholder="Ваше сообщение"
          />
          <button type="submit">
            {sendSignalIsLoading ? <UpdateLoader /> : <img src={Send} alt="send" />}
          </button>
        </InputWrapper>
      </Form>
    </Wrapper>
  );
};

export default SignalComponent;
