import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGame, GameStatus } from '../types';

const initialState: TGame = {
  status: GameStatus.PAUSE,
  createdAt: 0,
};

type TSelectStatusProps = {
  status: GameStatus,
};

type TSelectCreatedAt = {
  createdAt: number,
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

    selectCreatedAt(
      state,
      action: PayloadAction<TSelectCreatedAt>
    ) {
      state.createdAt = action.payload.createdAt;

      return state;
    },

    toggleStatus(state) {
      state.status = state.status === GameStatus.PLAY
        ? GameStatus.PAUSE : GameStatus.PLAY;

      return state;
    }
  }
});

export default slice;
