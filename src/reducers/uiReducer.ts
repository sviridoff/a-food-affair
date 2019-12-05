import { createSlice } from '@reduxjs/toolkit';

import { TUi } from '../types';

const initialState: TUi = {
  isIngredientsStoreVisible: false,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showIngredientsStore(state) {
      state.isIngredientsStoreVisible = true;

      return state;
    },
    hideIngredientsStore(state) {
      state.isIngredientsStoreVisible = false;

      return state;
    }
  }
});

export const { actions } = slice;

export default slice.reducer;
