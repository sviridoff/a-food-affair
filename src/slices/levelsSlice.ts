import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TLevels } from '../types';

const initialState: TLevels = {
  data: {
    '1': {
      id: '1',
      dishes: 2,
      lives: 1,
      maxClients: 1,
      maxTables: 1,
      timePerIngredient: 1000 * 60 * 60,
      isLock: false,
      randomTables: false,
    },
    '2': {
      id: '2',
      dishes: 2,
      lives: 1,
      maxClients: 2,
      maxTables: 1,
      timePerIngredient: 1000 * 60 * 60,
      isLock: true,
      randomTables: false,
    },
    '3': {
      id: '3',
      dishes: 2,
      lives: 1,
      maxClients: 3,
      maxTables: 5,
      timePerIngredient: 8000,
      isLock: true,
      randomTables: true,
    },
  },
  recipes: {
    '1': ['donut-kitkat'],
    '2': ['donut-oreo'],
    '3': ['donut-kitkat', 'donut-oreo'],
  },
};

type TRemoveTableProps = {
  tableId: string,
};

type TUnlockLevelProps = {
  level: number,
};

const slice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    unlockLevel(state, action: PayloadAction<TUnlockLevelProps>) {
      state.data[action.payload.level].isLock = false;

      return state;
    }
  }
});

export default slice;
