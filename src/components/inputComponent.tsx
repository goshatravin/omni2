/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import React from 'react';
import Styled from 'styled-components';

type IInput = {
  name: string;
  type: string;
  register?: any;
  value?: string;
  disabled?: boolean;
  validation?: any;
  placeholder?: string;
  onChange?: (value: any) => void;
  flex?: string;
};
const StyledInput: any = Styled.input`
  ::placeholder{
    color: ${(props) => props.theme.placeholderGrey}
  }
  height: 3.125rem;
  flex: ${(props: any) => (props.flex ? props.flex : 'none')};
  outline: none;
  padding-left: ${(props: any) => (props.name === 'search' ? 3 : 1)}rem;
  font-size: 1rem;
  border-radius: 5px;
  width: 330px;
  border: 1px solid ${(props: any) =>
    props.validation?.type === 'pattern' ||
    props.validation?.type === 'required' ||
    props.validation?.type === 'minLength'
      ? props.theme.tomato
      : props.theme.borderGrey};
`;
/**
 *
 * @param name - name of input
 * @param type - type of input
 * @param register - ref for access to the value of input. react-hook-form
 * @param validation - object with information about current error
 * @param placeholder - input placeholder
 * @param onChange - function for tracking value of input
 * @param value - input value
 * @param disabled - make input disabled again
 */
const InputComponent: React.FC<IInput> = ({
  name,
  type,
  register,
  validation,
  placeholder,
  onChange,
  value,
  disabled,
  flex
}) => (
  <StyledInput
    flex={flex}
    type={type}
    name={name}
    ref={register}
    placeholder={placeholder}
    validation={validation}
    onChange={onChange}
    value={value}
    disabled={disabled}
  />
);
export default InputComponent;
