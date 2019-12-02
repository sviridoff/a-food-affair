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
};

type SelectDishProps = {
  dish: TDish,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    selectDish(state, action: PayloadAction<SelectDishProps>) {
      const id = action.payload.dish.id;

      state.data[id].isSelected =
        state.data[id].isSelected
          ? false
          : true;

      return state;
    },
  }
});

export const { selectDish } = dishesSlice.actions;

export type TSelectDish = typeof selectDish;

export default dishesSlice.reducer;
