import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {};

const Reset = createSlice({
  name: 'Reset',
  initialState,
  reducers: {
    resetSlice: (state) => {}
  }
});

export const { resetSlice } = Reset.actions;
export default Reset.reducer;
