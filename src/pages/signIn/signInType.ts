import { FormStateProxy, DeepMap, FieldError } from 'react-hook-form';

export type ISignIn = {
  userStatusState: any;
  userStatusIsLoading: boolean;
  userStatusError: string;
  changeStatusState: '';
  changeStatusIsLoading: boolean;
  changeStatusError: string;
  userListState: [];
  userListIsLoading: boolean;
  userListError: string;
  userStatusListState: [];
  userStatusListIsLoading: boolean;
  userStatusListError: string;
  signInState: string;
  signInStatus: string;
  signInIsLoading: boolean;
  signInError: string;
  signInUser: {
    user?: string;
    id?: string;
  };
};
export type IUserData = {
  username: string;
  password: string;
};

export type ISignInComponent = {
  formSubmit: (data: IUserData) => void;
  handleSubmit: any;
  formState: FormStateProxy<IUserData>;
  errors: DeepMap<IUserData, FieldError>;
  register: any;
  signInIsLoading: boolean;
};
