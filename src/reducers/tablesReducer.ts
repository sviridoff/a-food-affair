import { createSlice } from '@reduxjs/toolkit';

import { TTables } from '../types';

const initialState: TTables = {
  data: {
    t1: {
      id: 't1',
    },
    t2: {
      id: 't2',
    },
    t3: {
      id: 't3',
    },
  },
  clients: {
    t1: ['c1', 'c2'],
    t2: ['c3'],
    t3: ['c4', 'c5'],
  },
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {}
});

export default tablesSlice.reducer;
