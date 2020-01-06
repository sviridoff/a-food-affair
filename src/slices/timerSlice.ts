import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTimer } from '../types';

const initialState: TTimer = {
  currentTime: 0,
};

type TSetProps = {
  currentTime: number,
};

const slice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TSetProps>) {
      state.currentTime = action.payload.currentTime;
    },
  },
});

export default slice;
