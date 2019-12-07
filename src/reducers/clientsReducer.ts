import { createSlice } from '@reduxjs/toolkit';

import { TClients } from '../types';

const initialState: TClients = {
  data: {
    c1: {
      id: 'c1',
    },
    c2: {
      id: 'c2',
    },
    c3: {
      id: 'c3',
    },
    c4: {
      id: 'c4',
    },
    c5: {
      id: 'c5',
    },
  },
  recipes: {
    c1: 'r1',
    c2: 'r2',
    c3: 'r2',
    c4: 'r2',
    c5: 'r2',
  },
};

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {}
});

export default slice.reducer;
