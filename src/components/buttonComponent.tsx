import React from 'react';
import Styled from 'styled-components';

type IButton = {
  children: any;
  type?: any;
  formState?: any;
  loading?: any;
  onClick?: () => void;
  height?: string;
  width?: string;
  padding?: string;
  border?: boolean;
  active?: boolean;
  colorBtn?: string;
  background?: string;
  borderRadius?: boolean;
  disabled?: any;
};

const Button: any = Styled.button`
  width: ${(props: any) => (props.width ? props.width : '350px')};
  height: ${(props: any) => (props.height ? props.height : '60')}px;
  padding: 0 ${(props: any) => (props.padding ? props.padding : 10)}rem;
  border-radius: ${(props: any) => (!props.borderRadius ? 'none' : '5px')};
  border: ${(props: any) => {
    if (props.colorBtn === 'infoOutline') return '1px solid #2D9CDB';

    return 'none';
  }};
  background: ${(props: any) => {
    if (props.disabled) return '#e5effc';
    if (props.colorBtn === 'infoOutline') return 'white';
    if (props.colorBtn === 'warning') return 'red';
    if (props.background) return props.background;
    return props.theme.activeBlue;
  }};
  cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed;')};
  font-size: 1rem;
  p{
    /* color: ${(props: any) => {
      if (props.colorBtn === 'infoOutline') return props.theme.text_color;
      if (props.colorBtn === 'warning') return props.theme.text_color;

      return 'white';
    }}; */
    color: white;
    font-size: 1rem;
    width: 100%;
    white-space:nowrap;
  }
`;

const ButtonComponent: React.FC<IButton> = ({
  type,
  children,
  borderRadius,
  formState,
  loading,
  disabled,
  onClick,
  height,
  width,
  padding,
  border,
  background,
  colorBtn,
  active
}) => {
  if (disabled) {
    console.log(disabled);
    return (
      <Button
        borderRadius={borderRadius}
        background={background}
        padding={padding}
        height={height}
        width={width}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        colorBtn={colorBtn}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      borderRadius={borderRadius}
      background={background}
      padding={padding}
      height={height}
      width={width}
      type={type}
      disabled={!active && (!formState || loading)}
      onClick={onClick}
      colorBtn={colorBtn}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
