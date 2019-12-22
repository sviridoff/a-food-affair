import { createSlice } from '@reduxjs/toolkit';

import { TRecipes } from '../types';

const initialState: TRecipes = {
  data: {
    r1: {
      id: 'r1',
    },
    r2: {
      id: 'r2',
    },
  },
  ingredients: {
    'r1': ['i1', 'i2'],
    'r2': ['i2', 'i3'],
  }
};

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {}
});

export default slice;
