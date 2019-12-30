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
      timePerIngredient: 10000000,
      isLock: false,
    },
    '2': {
      id: '2',
      dishes: 2,
      lives: 1,
      maxClients: 1,
      maxTables: 1,
      timePerIngredient: 410000000000,
      isLock: false,
    },
    '3': {
      id: '3',
      dishes: 2,
      lives: 3,
      maxClients: 3,
      maxTables: 5,
      timePerIngredient: 8000,
      isLock: false,
    },
  },
  recipes: {
    '1': ['r1'],
    '2': ['r1'],
    '3': ['r1', 'r2'],
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
