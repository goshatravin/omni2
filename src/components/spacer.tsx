/* eslint-disable import/prefer-default-export */
import Styled from 'styled-components';

type ISpacer = {
  x?: number;
  y?: number;
};

export const Spacer = Styled.div`
    height: ${(props: ISpacer) => (props.y ? props.y : 0)}rem;
    width: ${(props: ISpacer) => (props.x ? props.x : 0)}rem;
`;
