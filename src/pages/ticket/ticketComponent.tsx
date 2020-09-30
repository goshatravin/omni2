/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { TextComponent } from '../../components/textComponent';
import { RootState } from '../../store/rootReducer';
import { ITicketComponent, ITicketState } from './ticketType';
import { Spacer } from '../../components/spacer';
import { buttonData, MessangerImgSwitch } from './ticketFunctions';

const Wrapper = Styled.div`
  /* width: fit-content; */
  /* flex: 1; */
  /* padding: 0rem 0rem 1rem 1rem; */
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 325px;
`;
const TextBlock = Styled.div`
  flex: 1;
  span {
    font-weight: 300;
    padding-right: 5px;
    line-height: 20px;
    color: #9FA9AD;
  }
  `;
const TicketWrapper: any = Styled.div`
  cursor: pointer;
  background:${(props: any) => (props.name === '1' ? '#b9dc99' : 'white')};
  box-shadow: 0px 1px 4px #DFE1E5;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1rem;
  span {
    color: ${(props: any) => (props.name === '1' ? '#6d6d6d' : '#9FA9AD')};
  }
`;
const TicketSection = Styled.div`
  display: flex;
`;
const Block = Styled.div`
`;

const ImgBlock = Styled.div`
  margin-left: 0;
`;
const MessangerImg = Styled.img`
  padding: 1rem 1rem 1rem 0rem;
  max-width: 3rem;
`;
const SkeletonWrapper = Styled.div`
  padding: 0.5rem 0;
  width: 100%;
`;
const WrapperScroll = Styled.div`
  /* height: calc(100vh - 160px); */
  overflow: auto;
`;
const ButtonWrapper = Styled.div`
  padding: 1.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;
const Button = Styled.button`
  border-radius: 15px;
  background: white;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props: any) => (props.name === props.id && props ? '#4486ad' : 'white')};
  cursor: pointer;
`;

const TicketComponent: React.FC<ITicketComponent> = ({
  lastTicket,
  handleFilterTicket,
  currentBtn,
  openSignal
}) => {
  const {
    ticketState,
    ticketStatus,
    ticketIsLoading,
    ticketError,
    ticketHasMore,
    currentSignal
  } = useSelector((state: RootState) => state.TicketSlice);
  const RenderButtonSearch = () => (
    <>
      {buttonData.map((item) => (
        <Button
          id={item.id}
          name={currentBtn}
          key={item.id}
          type="button"
          onClick={() => handleFilterTicket(item.id, item, item.name)}
        >
          {item.name}
        </Button>
      ))}
    </>
  );
  const RenderTicket = () => (
    <>
      {ticketState.length > 0 ? (
        ticketState.map((item: ITicketState, index: number) =>
          ticketState.length === index + 1 ? (
            <TicketWrapper
              onClick={() => openSignal(item)}
              key={item.ticket_id}
              ref={lastTicket}
              name={currentSignal.ticket_id === item.ticket_id ? '1' : ''}
            >
              <TicketSection>
                <ImgBlock>
                  <MessangerImg src={MessangerImgSwitch(item.channel_type_id)} alt="img" />
                </ImgBlock>
                <TextBlock>
                  <Spacer y={1} />
                  <TextComponent size="h3">{item.customer}</TextComponent>
                  <Spacer y={1} />
                  <TextComponent size="p">
                    <span>Оператор:</span>
                    {item.assigned_to}
                  </TextComponent>
                  <Spacer y={0.5} />
                  <TextComponent size="p">
                    <span>Статус:</span>
                    {item.status_type}
                  </TextComponent>
                  <Spacer y={1} />
                </TextBlock>
                <Block>
                  <TextComponent size="p" weight="light">
                    {moment(item.created_at).format('hh:mm')}
                  </TextComponent>
                </Block>
              </TicketSection>
              <TicketSection>
                <Block>
                  <TextComponent size="p">
                    {item.latest_signal ? item.latest_signal : '...'}
                  </TextComponent>
                </Block>
              </TicketSection>
            </TicketWrapper>
          ) : (
            <TicketWrapper
              onClick={() => openSignal(item)}
              key={item.ticket_id}
              name={currentSignal.ticket_id === item.ticket_id ? '1' : ''}
            >
              <TicketSection>
                <ImgBlock>
                  <MessangerImg src={MessangerImgSwitch(item.channel_type_id)} alt="img" />
                </ImgBlock>
                <TextBlock>
                  <Spacer y={1} />
                  <TextComponent size="h3">{item.customer}</TextComponent>
                  <Spacer y={1} />
                  <TextComponent size="p">
                    <span>Оператор:</span>
                    {item.assigned_to}
                  </TextComponent>
                  <Spacer y={0.5} />
                  <TextComponent size="p">
                    <span>Статус:</span>
                    {item.status_type}
                  </TextComponent>
                  <Spacer y={1} />
                </TextBlock>
                <Block>
                  <TextComponent size="p" weight="light">
                    {moment(item.created_at).format('hh:mm')}
                  </TextComponent>
                </Block>
              </TicketSection>
              <TicketSection>
                <Block>
                  <TextComponent size="p">
                    {item.latest_signal ? item.latest_signal : '...'}
                  </TextComponent>
                </Block>
              </TicketSection>
            </TicketWrapper>
          )
        )
      ) : (
        <p />
      )}
    </>
  );

  return (
    <Wrapper>
      <ButtonWrapper>
        <RenderButtonSearch />
      </ButtonWrapper>
      <WrapperScroll>
        <RenderTicket />
        {ticketIsLoading && (
          <SkeletonWrapper>
            <Skeleton width="100%" />
          </SkeletonWrapper>
        )}
        {ticketError && <p>Error</p>}
      </WrapperScroll>
    </Wrapper>
  );
};

export default TicketComponent;
