import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGame, GameStatus } from '../types';

const initialState: TGame = {
  status: GameStatus.PAUSE,
  tables: 0,
  nextTableTime: 0,
};

type TSelectStatusProps = {
  status: GameStatus,
};

type TSelectNextTableTimeProps = {
  nextTableTime: number,
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

    toggleStatus(state) {
      state.status = state.status === GameStatus.PLAY
        ? GameStatus.PAUSE : GameStatus.PLAY;

      return state;
    },

    selectNextTableTime(
      state,
      action: PayloadAction<TSelectNextTableTimeProps>,
    ) {
      state.nextTableTime = action.payload.nextTableTime;

      return state;
    }
  }
});

export default slice;
