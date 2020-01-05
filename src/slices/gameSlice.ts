import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGame, GameStatus } from '../types';

const initialState: TGame = {
  status: GameStatus.FIRST_STOP,
  tables: 0,
  nextTableTime: 0,
};

type TSelectStatusProps = {
  status: GameStatus,
};

type TSelectNextTableTimeProps = {
  nextTableTime: number,
};

type TRestartGameProps = {
  nextTableTime: number,
};

export type TStartgameProps = {
  currentTime: number,
  lives: number,
  dishesIds: string[],
  levelId: number,
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectStatus(
      state,
      action: PayloadAction<TSelectStatusProps>
    ) {
      state.status = action.payload.status;

      return state;
    },

    increaseTables(state) {
      state.tables += 1;

      return state;
    },

    selectNextTableTime(
      state,
      action: PayloadAction<TSelectNextTableTimeProps>,
    ) {
      state.nextTableTime = action.payload.nextTableTime;

      return state;
    },

    startgame(
      state,
      action: PayloadAction<TStartgameProps>,
    ): TGame {
      return {
        status: GameStatus.PLAY,
        tables: 0,
        nextTableTime: action.payload.currentTime + 2000,
      };
    },
  }
});

export default slice;
