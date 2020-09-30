import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SweetAlertComponent from '../../components/sweetAlertComponent';
import SignInComponent from './signInComponent';
import { IUserData } from './signInType';
import { RootState } from '../../store/rootReducer';
import { reset } from '../../store/globalAction';
import LogoComponent from '../../components/logoComponent';
import fetchUser from './signInAction';

const Wrapper = Styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 100vh;
`;
const Picture = Styled.div`
  background: rgb(164,231,254);
  background: linear-gradient(90deg, rgba(244,231,254,1) 29%, rgba(149,189,241,1) 100%);
  height: 100vh;
  width: 100%;
  flex: 1;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const FormWrapper = Styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  flex: 1;
`;

const SignInContainer: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm<IUserData>({
    defaultValues: {
      username: 'george.travin',
      password: 'Ba_63423774'
    },
    mode: 'onSubmit'
  });
  const dispatch = useDispatch();
  const { signInIsLoading, signInError, signInStatus } = useSelector(
    (state: RootState) => state.SignInSlice
  );

  const formSubmit = (data: IUserData) => {
    const { username, password } = data;
    dispatch(fetchUser(username, password));
  };
  useEffect(() => {
    const handleSweet = (isConfirmed: boolean) => {
      if (isConfirmed) {
        dispatch(reset());
      }
    };
    if (signInStatus === 'failed') {
      SweetAlertComponent({
        title: 'Ошибка',
        text: signInError,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        handleSweet
      });
    }
  }, [signInStatus, signInError, dispatch]);
  if (signInStatus !== 'success' && !!localStorage.getItem('token') === false) {
    return (
      <Wrapper>
        <FormWrapper>
          <LogoComponent />
          <SignInComponent
            formSubmit={formSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            formState={formState}
            signInIsLoading={signInIsLoading}
          />
        </FormWrapper>
        <Picture />
      </Wrapper>
    );
  }
  return <Redirect to="/" />;
};

export default SignInContainer;
