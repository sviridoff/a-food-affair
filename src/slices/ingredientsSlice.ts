import { createSlice } from '@reduxjs/toolkit';

import { TIngredients } from '../types';

const initialState: TIngredients = {
  data: {
    i1: {
      id: 'i1',
    },
    i2: {
      id: 'i2',
    },
    i3: {
      id: 'i3',
    },
    i4: {
      id: 'i4',
    },
    i5: {
      id: 'i5',
    },
  },
  ids: ['i1', 'i2', 'i3', 'i4', 'i5'],
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {}
});

export default slice;
