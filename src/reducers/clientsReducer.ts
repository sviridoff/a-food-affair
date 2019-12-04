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
};

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {}
});

export default slice.reducer;
