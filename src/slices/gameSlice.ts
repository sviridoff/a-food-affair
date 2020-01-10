import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

import { TGame, GameStatus, VisibleModalType } from '../types';
import { TAddTableProps } from './tablesSlice';

const initialState: TGame = {
  status: GameStatus.FIRST_STOP,
  tables: 0,
  nextTableTime: 0,
  combo: 0,
};

type TSelectStatusProps = {
  status: GameStatus,
};

export type TStartgameProps = {
  currentTime: number,
  lives: number,
  dishesIds: string[],
  levelId: number,
};

export type TToggleResumegameProps = {
  status: GameStatus,
  modalType: VisibleModalType,
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
    },

    startgame(
      state,
      action: PayloadAction<TStartgameProps>,
    ): TGame {
      return {
        status: GameStatus.PLAY,
        tables: 0,
        nextTableTime: action.payload.currentTime + 2000,
        combo: 0,
      };
    },

    togglePausegame(
      state,
      action: PayloadAction<TToggleResumegameProps>,
    ) {
      state.status = action.payload.status;
    },
  },
  extraReducers: {
    [createAction('tables/addTable').type](
      state,
      action: PayloadAction<TAddTableProps>,
    ) {
      state.tables += 1;
      state.nextTableTime = action.payload.nextTableTime;
    },

    [createAction('clients/setOk').type](state) {
      state.combo = state.combo < 2
        ? 2
        : state.combo;
      state.combo += 1;
    },

    [createAction('clients/setKo').type](state) {
      state.combo = state.combo === 2
        ? 1
        : 2;
    },

    [createAction('clients/updateStatuses').type](state) {
      state.combo = state.combo === 2
        ? 1
        : 2;
    },
  },
});

export default slice;
