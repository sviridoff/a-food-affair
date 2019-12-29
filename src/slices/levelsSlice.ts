import { createSlice } from '@reduxjs/toolkit';

import { TLevels } from '../types';

const initialState: TLevels = {
  data: {
    '1': {
      id: '1',
      dishes: 2,
      maxClients: 3,
      maxTables: 3,
      timePerIngredient: 4000,
    },
    '2': {
      id: '2',
      dishes: 2,
      maxClients: 3,
      maxTables: 5,
      timePerIngredient: 4000,
    },
  },
  recipes: {
    '1': ['r1', 'r2'],
    '2': ['r2'],
  },
};

type TRemoveTableProps = {
  tableId: string,
};

const slice = createSlice({
  name: 'levels',
  initialState,
  reducers: {}
});

export default slice;
