import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

const SecretRoute = ({ component: Component, ...rest }: any) => {
  const { signInIsLoading, signInState, signInStatus } = useSelector(
    (state: RootState) => state.SignInSlice
  );
  const isValidated = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => (isValidated ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default SecretRoute;
