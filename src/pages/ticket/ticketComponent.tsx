/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import Search from '../../theme/svg/search.svg';
import Close from '../../theme/svg/close.svg';
import { TextComponent } from '../../components/textComponent';
import { RootState } from '../../store/rootReducer';
import { ITicketComponent, ITicketState } from './ticketType';
import { Spacer } from '../../components/spacer';
import { buttonData, MessangerImgSwitch } from './ticketFunctions';
import InputComponent from '../../components/inputComponent';
import ButtonComponent from '../../components/buttonComponent';

const Wrapper = Styled.div`
  /* width: fit-content; */
  /* flex: 1; */
  /* padding: 0rem 0rem 1rem 1rem; */
  display: flex;
  flex-direction: column;
  flex: 1;
  width: fit-content;
  max-width: 350px;
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
const MarginBlock = Styled.div`
  text-align: right;
`;
const TicketWrapper: any = Styled.div`
  cursor: pointer;
  border: 1px solid ${(props: any) => (props.newTicket ? '#2f80ec;' : 'none')};
  background:${(props: any) => (props.name === '1' ? '#b9dc99' : 'white')};
  box-shadow: 0px 1px 4px #DFE1E5;
  border-radius: 5px;
  margin: 1rem 0.5rem;
  /* padding: rem; */
  padding: 1rem 1rem;

  span {
    color: ${(props: any) => (props.name === '1' ? '#6d6d6d' : '#9FA9AD')};
  }
`;
const TicketSection = Styled.div`
  display: flex;
`;
const Block = Styled.div`
`;
const FlexBlock = Styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  /* padding: 1.5rem 0.5rem; */
  display: flex;
  padding: 1rem 1rem;
  justify-content: space-between;
`;
const Button = Styled.button`
  border-radius: 15px;
  background: white;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props: any) => (props.name === props.id && props ? '#4486ad' : 'white')};
  cursor: pointer;
`;
const NewMessageBlock: any = Styled.div`
  display: ${(props: any) => (props.newMessage ? 'block' : 'none')};
  width: 15px;
  height: 15px;
  background: #2f80ec;
  border-radius: 50%;
`;
const SearchWrapper = Styled.div`
  padding: 1rem 1rem 0 1rem;
  position: relative;
  max-width: 100%;
`;
const ButtonSearch: any = Styled.button`
  cursor: ${(props: any) => (!props.disabled ? 'pointer' : 'not-allowed;')};
  margin-top: 1rem ;
  padding: 0.5rem 1rem;
  background:${(props: any) => (props.disabled ? '#9fb1ca' : '#2f80ec')};
  border:none;
  border-radius: 10px;
  color: white;

`;
const ImgClose = Styled.img`
    position: absolute;
    top: 35px;
    left: 300px;
    max-width: 1rem;
    cursor: pointer;
`;
const ImgSearch = Styled.img`
    position: absolute;
    top:31px;
    left: 31px;
    max-width: 1.25rem;
`;
const TicketComponent: React.FC<ITicketComponent> = ({
  lastTicket,
  handleFilterTicket,
  currentBtn,
  openSignal,
  setHandleSearchChange,
  handleSearchChange,
  sendSearch,
  handleCleanSearch
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
          onClick={() => handleFilterTicket(item.id, localStorage.getItem('userId'), item)}
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
              newTicket={!!item?.newTicket}
            >
              <TicketSection>
                <ImgBlock>
                  <MessangerImg src={MessangerImgSwitch(item.channel_type_id)} alt="img" />
                </ImgBlock>
                <TextBlock>
                  <MarginBlock>
                    <TextComponent size="PSmall" weight="light">
                      {moment(item?.updated_at ? item?.updated_at : item.created_at).diff(
                        moment(new Date()),
                        'days'
                      ) === 0
                        ? moment(item.updated_at ? item.updated_at : item.created_at).format('hh:mm')
                        : moment(item.updated_at ? item.updated_at : item.created_at).format(
                            'DD-MM-YYYY  hh:mm'
                          )}
                    </TextComponent>
                  </MarginBlock>
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
              </TicketSection>
              <TicketSection>
                <FlexBlock>
                  <TextComponent size="p">{item?.latest_signal}</TextComponent>
                  <NewMessageBlock newMessage={!!item?.newMessage} />
                </FlexBlock>
              </TicketSection>
            </TicketWrapper>
          ) : (
            <TicketWrapper
              onClick={() => openSignal(item)}
              key={item.ticket_id}
              name={currentSignal.ticket_id === item.ticket_id ? '1' : ''}
              newTicket={!!item?.newTicket}
            >
              <TicketSection>
                <ImgBlock>
                  <MessangerImg src={MessangerImgSwitch(item.channel_type_id)} alt="img" />
                </ImgBlock>
                <TextBlock>
                  <MarginBlock>
                    <TextComponent size="PSmall" weight="light">
                      {moment(item?.updated_at ? item?.updated_at : item.created_at).diff(
                        moment(new Date()),
                        'days'
                      ) === 0
                        ? moment(item.updated_at ? item.updated_at : item.created_at).format('hh:mm')
                        : moment(item.updated_at ? item.updated_at : item.created_at).format(
                            'DD-MM-YYYY  hh:mm'
                          )}
                    </TextComponent>
                  </MarginBlock>

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
              </TicketSection>
              <TicketSection>
                <FlexBlock>
                  <TextComponent size="p">{item?.latest_signal}</TextComponent>
                  <NewMessageBlock newMessage={!!item?.newMessage} />
                </FlexBlock>
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
      <SearchWrapper>
        <InputComponent
          value={handleSearchChange}
          onChange={(e) => setHandleSearchChange(e.target.value)}
          type="text"
          name="search"
          width="230"
        />
        <ButtonSearch
          disabled={handleSearchChange.length === 0}
          type="button"
          onClick={() => sendSearch()}
        >
          Отправить
        </ButtonSearch>

        {handleSearchChange.length !== 0 && (
          <ImgClose src={Close} onClick={() => handleCleanSearch()} alt="" />
        )}

        <ImgSearch src={Search} alt="" />
      </SearchWrapper>
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
