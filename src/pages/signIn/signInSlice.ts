import { createSlice } from '@reduxjs/toolkit';
import { ISignIn } from './signInType';

const initialState: ISignIn = {
  signInState: '',
  signInStatus: 'none',
  signInIsLoading: false,
  signInError: '',
  signInUser: {}
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
    }
  }
});

export const {
  signInStart,
  signInComplete,
  signInError,
  signInNameComplete,
  signInNameError
} = userAuth.actions;
export default userAuth.reducer;
