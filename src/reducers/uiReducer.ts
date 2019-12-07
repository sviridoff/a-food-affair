import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUi } from '../types';

const initialState: TUi = {
  isIngredientsStoreVisible: false,
  isRecipesVisible: false,
  selectedRecipe: null,
};

type TSelectRecipeProp = {
  recipeId: string,
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
    },

    showRecipes(state) {
      state.isRecipesVisible = true;

      return state;
    },

    hideRecipes(state) {
      state.isRecipesVisible = false;

      return state;
    },

    selectRecipe(state, action: PayloadAction<TSelectRecipeProp>) {
      state.selectedRecipe = action.payload.recipeId;
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
