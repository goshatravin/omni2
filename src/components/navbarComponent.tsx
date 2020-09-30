import React, { useState, useRef, useEffect } from 'react';
import Styled from 'styled-components';
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux';
import history from '../helpers/history';
import Logo from '../theme/svg/Logo.svg';
import SignOut from '../theme/svg/arrow.svg';
import Info from '../theme/svg/info.svg';
import Setting from '../theme/svg/settings.svg';
import { reset } from '../store/globalAction';

const NavBar = Styled.div`
  height: 4rem;
  display: flex;
  background: white;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  display: flex;
`;
const AvatarCustom = Styled(Avatar)`
  cursor: pointer;
  span{
    letter-spacing:0.1rem;
    font-weight: 300;
  }
`;
const ImgWrapper = Styled.div`
  flex: 1;
  text-align: left;
  max-width: 2rem;
  padding-right: 2rem;
  padding-left: 2rem;
`;
const Menu = Styled.div`
  position: absolute;
  right: -25px;
  bottom: -165px;
  text-align: center;

`;
const MenuButton = Styled.div`
  padding: 1rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.borderGrey};
  :hover{
    background: #d9dfe4;
  }
  img {
    max-width: 1rem;
  }
  p{
    padding: 0 1rem;
  }
`;
const LogoWrapper = Styled.div``;
const AvatarWrapper = Styled.div`
  position: relative;
`;

type INavBarComponent = {};

const NavBarComponent: React.FC<INavBarComponent> = () => {
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const dispatch = useDispatch();
  const ref = useRef<any>(null);

  const handleClick = (e: any) => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setOpenDrop(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  const handleLogOut = () => {
    dispatch(reset());
    history.push('/login');
  };

  return (
    <NavBar>
      <LogoWrapper>
        <img src={Logo} alt="Logo" />
      </LogoWrapper>
      <AvatarWrapper ref={ref}>
        <AvatarCustom
          name="Georgey Travin"
          round
          size="50"
          color="#F6F6F6"
          onClick={() => setOpenDrop(!openDrop)}
        />
        {openDrop ? (
          <Menu>
            <MenuButton onClick={() => handleLogOut()}>
              <ImgWrapper>
                <img src={SignOut} alt="Выход" />
              </ImgWrapper>
              <p>Выйти</p>
            </MenuButton>

            <MenuButton>
              <ImgWrapper>
                <img src={Info} alt="Информация" />
              </ImgWrapper>
              <p>Настройки</p>
            </MenuButton>

            <MenuButton>
              <ImgWrapper>
                <img src={Setting} alt="Настройки" />
              </ImgWrapper>
              <p>Инфо</p>
            </MenuButton>
          </Menu>
        ) : (
          ''
        )}
      </AvatarWrapper>
    </NavBar>
  );
};

export default NavBarComponent;
