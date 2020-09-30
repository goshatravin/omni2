import Styled, { keyframes } from 'styled-components';

export const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;

export const LoaderComponent = Styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  &:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: ${Animation} 1.2s linear infinite;
  }
`;
LoaderComponent.displayName = 'loader';
