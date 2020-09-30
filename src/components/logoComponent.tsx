import React from 'react';
import Styled from 'styled-components';
import { Text } from '../pages/signIn/signInText';

const LogoWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;
const Logo = Styled.p`
  font-size: 2rem;
  letter-spacing: 5px;
  color: lightsteelblue;
  font-weight: bold;
  text-transform: uppercase;
`;
const LogoComponent: React.FC = () => (
  <LogoWrapper>
    <Logo>{Text.logo.text}</Logo>
  </LogoWrapper>
);

export default LogoComponent;
