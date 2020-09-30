import React from 'react';
import Styled from 'styled-components';
import InputComponent from '../../components/inputComponent';
import ButtonComponent from '../../components/buttonComponent';
import ErrorComponent from '../../components/errorComponent';

import { ISignInComponent } from './signInType';
import { Text } from './signInText';
import { LoaderComponent } from '../../components/loaderComponent';

const Form = Styled.form`
`;
const ButtonWrapper = Styled.div`
  padding-top: 2rem;
`;
const InputWrapper = Styled.div`
  padding-top: 0.5rem;
`;
const SignInComponent: React.FC<ISignInComponent> = ({
  formSubmit,
  handleSubmit,
  errors,
  formState,
  register,
  signInIsLoading
}) => (
  <Form onSubmit={handleSubmit(formSubmit)}>
    <InputComponent
      name="username"
      validation={errors?.username}
      register={register({
        required: Text.inputs.userName.validation.required,
        minLength: {
          value: 3,
          message: Text.inputs.userName.validation.minLength.message
        }
      })}
      type="text"
      placeholder={Text.inputs.userName.placeholder}
    />
    <ErrorComponent error={errors?.username} />
    <InputWrapper>
      <InputComponent
        name="password"
        validation={errors?.password}
        register={register({
          required: Text.inputs.password.validation.required,
          minLength: {
            value: 3,
            message: Text.inputs.password.validation.minLength.message
          }
        })}
        type="password"
        placeholder={Text.inputs.password.placeholder}
      />
      <ErrorComponent error={errors?.password} />
    </InputWrapper>

    <ButtonWrapper>
      <ButtonComponent padding="9.5" type="submit" formState loading={signInIsLoading}>
        {signInIsLoading && <LoaderComponent />}
        {!signInIsLoading && <p>{Text.buttons.signInSend.value}</p>}
      </ButtonComponent>
    </ButtonWrapper>
  </Form>
);

export default SignInComponent;
