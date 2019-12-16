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
      status,
      action: PayloadAction<TSelectCreatedAt>
    ) {
      status.createdAt = action.payload.createdAt;

      return status;
    },
  }
});

export const actions = slice.actions;

export default slice.reducer;
