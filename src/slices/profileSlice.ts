import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfile } from '../types';

const defaultLives = 1;

const initialState: TProfile = {
  lives: defaultLives,
  coins: 0,
  level: 1,
};

type TIncreaseCoinsProps = {
  coins: number,
};

type TDecreaseLivesProps = {
  lives: number,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    restartProfile(state) {
      state = {
        coins: 0,
        lives: defaultLives,
        level: state.level,
      };

      return state;
    },

    decreaseLive(state) {
      state.lives -= 1;

      return state;
    },

    decreaseLives(
      state,
      action: PayloadAction<TDecreaseLivesProps>,
    ) {
      const lives = action.payload.lives;

      state.lives -= lives;

      return state;
    },

    increseCoins(state, actions: PayloadAction<TIncreaseCoinsProps>) {
      const coins = actions.payload.coins;

      state.coins += coins;

      return state;
    },
  }
});

export default slice;