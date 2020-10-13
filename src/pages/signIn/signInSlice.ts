import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { ISignIn } from './signInType';

const initialState: ISignIn = {
  signInState: '',
  signInStatus: 'none',
  signInIsLoading: false,
  signInError: '',
  signInUser: {},

  userStatusListState: [],
  userStatusListIsLoading: false,
  userStatusListError: '',

  userListState: [],
  userListIsLoading: false,
  userListError: '',

  changeStatusState: '',
  changeStatusIsLoading: false,
  changeStatusError: ''
};

const userAuth = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    signInStart: (state: ISignIn) => {
      state.signInStatus = 'requesting';
      state.signInIsLoading = true;
    },
    signInComplete: (state: ISignIn, action) => {
      state.signInStatus = 'success';
      state.signInIsLoading = false;
      state.signInState = action.payload;
    },
    signInError: (state: ISignIn, action) => {
      state.signInStatus = 'failed';
      state.signInIsLoading = false;
      state.signInError = action.payload;
    },
    signInNameComplete: (state: ISignIn, action) => {
      state.signInUser = action.payload;
    },
    signInNameError: (state: ISignIn, action) => {
      state.signInError = action.payload;
    },
    userStatusListStart: (state: ISignIn) => {
      state.userStatusListIsLoading = true;
    },
    userStatusListComplete: (state: ISignIn, action) => {
      state.userStatusListIsLoading = false;
      state.userStatusListState = action.payload;
    },
    userStatusListError: (state: ISignIn, action) => {
      state.userStatusListIsLoading = false;
      state.userStatusListError = action.payload;
    },
    userListStart: (state: ISignIn) => {
      state.userListIsLoading = true;
    },
    userListComplete: (state: ISignIn, action) => {
      state.userListIsLoading = false;
      state.userListState = action.payload;
    },
    userListError: (state: ISignIn, action) => {
      state.userListIsLoading = false;
      state.userListError = action.payload;
    },
    changeStatusStart: (state: ISignIn) => {
      state.changeStatusIsLoading = true;
    },
    changeStatusComplete: (state: ISignIn, action) => {
      state.changeStatusIsLoading = false;
      state.changeStatusState = action.payload;
    },
    changeStatusError: (state: ISignIn, action) => {
      state.changeStatusError = action.payload;
      state.changeStatusIsLoading = false;
    }
  }
});

export const {
  signInStart,
  signInComplete,
  signInError,
  signInNameComplete,
  signInNameError,
  userStatusListStart,
  userStatusListComplete,
  userStatusListError,
  userListStart,
  userListComplete,
  userListError,
  changeStatusStart,
  changeStatusComplete,
  changeStatusError
} = userAuth.actions;
export default userAuth.reducer;
