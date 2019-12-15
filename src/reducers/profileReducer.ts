import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfile } from '../types';

const defaultLives = 1;

const initialState: TProfile = {
  lives: defaultLives,
  coins: 0,
  level: 1,
  tables: 0,
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
    },

    increaseTables(state) {
      state.tables += 1;

      return state;
    },

    restartProfile(state) {
      state = {
        tables: 0,
        coins: 0,
        lives: defaultLives,
        level: state.level,
      };

      return state;
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
