import { createSlice } from '@reduxjs/toolkit';

import { TIngredients } from '../types';

const initialState: TIngredients = {
  data: {
    donut: {
      id: 'donut',
    },
    oreo: {
      id: 'oreo',
    },
    kitkat: {
      id: 'kitkat',
    },
  },
  ids: ['donut', 'oreo', 'kitkat'],
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {}
});

export default slice;
