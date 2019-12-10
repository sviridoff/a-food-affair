import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUi } from '../types';

const initialState: TUi = {
  isIngredientsStoreVisible: false,
  isRecipesVisible: false,
  isStartpageVisible: true,
  selectedRecipe: null,
  selectedDish: null,
};

type TSelectRecipeProp = {
  recipeId: string | null,
};

type TSelectDishProp = {
  dishId: string | null,
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

    showStartpage(state) {
      state.isStartpageVisible = true;

      return state;
    },

    hideStartpage(state) {
      state.isStartpageVisible = false;

      return state;
    },

    selectRecipe(state, action: PayloadAction<TSelectRecipeProp>) {
      state.selectedRecipe = action.payload.recipeId;
    },

    selectDish(state, action: PayloadAction<TSelectDishProp>) {
      state.selectedDish = action.payload.dishId;
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
