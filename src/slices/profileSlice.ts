import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProfile } from '../types';
import gameSlice, { TStartgameProps } from './gameSlice';
import clientsSlice from './clientsSlice';

const defaultLives = 1;

const initialState: TProfile = {
  lives: defaultLives,
  coins: 0,
  levelId: 3,
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

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    selectLevel(state, action: PayloadAction<TSelectLevelProps>) {
      state.levelId = action.payload.levelId;

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
    [gameSlice.actions.startgame.type](
      _,
      action: PayloadAction<TStartgameProps>,
    ): TProfile {
      return {
        coins: 0,
        lives: action.payload.lives,
        levelId: action.payload.levelId,
      };
    },

    [clientsSlice.actions.setKo.type](state) {
      state.lives -= 1;
    },
  }
});

export default slice;
