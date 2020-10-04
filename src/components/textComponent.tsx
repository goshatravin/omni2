import React from 'react';
import Styled from 'styled-components';

export type IText = {
  /**
   * Optional Size of text element
   */
  size?: 'h1' | 'h2' | 'h3' | 'p' | 'PSmall' | 'link';
  /**
   *  Text value
   */
  children: string | any;
  /**
   *  Optional Font weight
   */
  weight?: 'light';
  /**
   *  Optional Function
   */
  onClick?: () => void;
  color?: string;
};
const H1 = Styled.h1`
  letter-spacing: 1px;
  color: ${(props: any) => (props.color ? props.color : props.theme.active_color)};
`;
const H2 = Styled.h2`
  letter-spacing: 1px;
  color: ${(props: any) => (props.color ? props.color : props.theme.active_color)};
`;
const H3 = Styled.h3`
  letter-spacing: 1px;
  color: ${(props: any) => (props.color ? props.color : props.theme.active_color)};
`;
const P: any = Styled.p`
  letter-spacing: 1px;
  color: ${(props: any) => (props.color ? props.color : props.theme.active_color)};
  font-weight: ${(props: any) => (props.weight ? '300' : '400')};
`;
const PSMall: any = Styled.p`
  font-size: 11px;
  letter-spacing: 1px;
  color: ${(props: any) => (props.color ? props.color : props.theme.active_color)};
  font-weight: ${(props: any) => (props.weight ? '300' : '400')};
`;
const Link = Styled.p`
  letter-spacing: 1px;
  color: ${(props: any) => (props.color ? props.color : props.theme.active_color)};
  cursor: pointer;
  border-bottom: 0.125rem solid ${(props) => props.theme.active_color};
  padding-bottom: .1rem;
  width: fit-content;
`;

export const TextComponent: React.FC<IText> = ({
  size = 'p',
  children = 'Hello, World!',
  weight,
  onClick,
  color
}) => {
  const TextType = () => {
    switch (size) {
      case 'PSmall':
        return <PSMall>{children}</PSMall>;
      case 'h1':
        return <H1 color={color}>{children}</H1>;
      case 'h2':
        return <H2 color={color}>{children}</H2>;
      case 'h3':
        return <H3 color={color}>{children}</H3>;
      case 'link':
        return (
          <Link color={color} onClick={onClick}>
            {children}
          </Link>
        );
      case 'p':
      default:
        return <P weight={weight}>{children}</P>;
    }
  };

  return <>{TextType()}</>;
};
