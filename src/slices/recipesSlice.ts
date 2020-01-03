import { createSlice } from '@reduxjs/toolkit';

import { TRecipes } from '../types';

const initialState: TRecipes = {
  data: {
    'donut-kitkat': {
      id: 'donut-kitkat',
    },
    'donut-oreo': {
      id: 'donut-oreo',
    },
  },
  ingredients: {
    'donut-kitkat': ['donut', 'kitkat'],
    'donut-oreo': ['donut', 'oreo'],
  }
};

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {}
});

export default slice;
