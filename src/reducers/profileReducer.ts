import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfile } from '../types';

const initialState: TProfile = {
  lives: 8,
  coins: 0,
  level: 1,
};

type TIncreaseCoinsProps = {
  coins: number,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    decreaseLive(state) {
      state.lives -= 1;

      return state;
    },

    increseCoins(state, actions: PayloadAction<TIncreaseCoinsProps>) {
      const coins = actions.payload.coins;

      state.coins += coins;

      return state;
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
