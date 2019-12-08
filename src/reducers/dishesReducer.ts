import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TDishes } from '../types';

const initialState: TDishes = {
  data: {
    d1: {
      id: 'd1',
      isSelected: false,
    },
    d2: {
      id: 'd2',
      isSelected: false,
    },
    d3: {
      id: 'd3',
      isSelected: false,
    },
  },
  ids: ['d1', 'd2', 'd3'],
  ingredients: {
    d1: ['i1', 'i2', 'i2', 'i3', 'i4'],
    d2: ['i3'],
  }
};

type TSelectProps = {
  dishId: string,
};

type TAddIngredientsProps = {
  dishId: string,
  ingredients: string[],
};

type TAddIngredientProp = {
  dishId: string,
  ingredientId: string,
};

const slice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    select(state, action: PayloadAction<TSelectProps>) {
      const dishId = action.payload.dishId;

      state.data[dishId].isSelected = true;

      return state;
    },

    unselect(state, action: PayloadAction<TSelectProps>) {
      const dishId = action.payload.dishId;

      state.data[dishId].isSelected = false;

      return state;
    },

    addIngredients(state, action: PayloadAction<TAddIngredientsProps>) {
      const { dishId, ingredients } = action.payload;

      state.ingredients[dishId] = state.ingredients[dishId] || [];
      state.ingredients[dishId] =
        state.ingredients[dishId].concat(ingredients);

      return state;
    },

    addIngredient(state, action: PayloadAction<TAddIngredientProp>) {
      const { dishId, ingredientId } = action.payload;

      state.ingredients[dishId] = state.ingredients[dishId] || [];
      state.ingredients[dishId].push(ingredientId);
    },

    removeAllIngredients(state, action: PayloadAction<TSelectProps>) {
      const dishId = action.payload.dishId;

      state.ingredients[dishId] = [];

      return state;
    },
  }
});

export const actions = slice.actions;

export default slice.reducer;
