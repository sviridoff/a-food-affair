import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfile } from '../types';
import gameSlice, { TStartgameProps } from './gameSlice';

const defaultLives = 1;

const initialState: TProfile = {
  lives: defaultLives,
  coins: 0,
  levelId: 1,
};

type TIncreaseCoinsProps = {
  coins: number,
};

type TDecreaseLivesProps = {
  lives: number,
};

type TSelectLevelProps = {
  levelId: number,
};

type TRestartProfileProps = {
  lives: number,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    selectLevel(state, action: PayloadAction<TSelectLevelProps>) {
      state.levelId = action.payload.levelId;

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
  },
  extraReducers: {
    // @ts-ignore
    [gameSlice.actions.startgame](
      state,
      action: PayloadAction<TStartgameProps>,
    ): TProfile {
      return {
        coins: 0,
        lives: action.payload.lives,
        levelId: action.payload.levelId,
      };
    }
  }
});

export default slice;
