import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TDish, TDishes } from '../types';

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
    d1: ['i1', 'i2'],
    d2: ['i3'],
  }
};

type SelectDishProps = {
  dish: TDish,
};

const slice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    selectDish(state, action: PayloadAction<SelectDishProps>) {
      Object.values(state.data).forEach(dish => {
        dish.isSelected = false;
      });

      const id = action.payload.dish.id;

      state.data[id].isSelected =
        state.data[id].isSelected
          ? false
          : true;

      return state;
    },
  }
});

export const actions = slice.actions;

export default slice.reducer;
