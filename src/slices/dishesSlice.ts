import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TDishes, TDish } from '../types';
import gameSlice, { TStartgameProps } from './gameSlice';
import clientsSlice, { TSetOkProps } from './clientsSlice';

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
  },
  ids: ['d1', 'd2'],
  ingredients: {
    d1: ['donut', 'kitkat', 'oreo'],
    d2: ['oreo', 'donut'],
  }
};

type TAddIngredientProps = {
  dishId: string,
  ingredientId: string,
};

type TClearProps = {
  dishId: string,
};

type TCopyProps = {
  dishId: string,
  selectedDishId: string,
};

export type TSelectProps = {
  dishId: string,
};

const slice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TAddIngredientProps>) {
      const { dishId, ingredientId } = action.payload;

      state.ingredients[dishId] = state.ingredients[dishId] || [];
      state.ingredients[dishId].push(ingredientId);
    },

    clear(state, action: PayloadAction<TClearProps>) {
      const dishId = action.payload.dishId;

      state.ingredients[dishId] = [];
      state.data[dishId].isSelected = false;
    },

    copy(state, action: PayloadAction<TCopyProps>) {
      const {
        dishId,
        selectedDishId,
      } = action.payload;
      const ingredientsIds = state.ingredients[selectedDishId];

      state.ingredients[dishId] =
        (state.ingredients[dishId] || []).concat(ingredientsIds || []);
      state.ingredients[selectedDishId] = [];
      state.data[selectedDishId].isSelected = false;
    },

    select(
      state,
      action: PayloadAction<TSelectProps>,
    ) {
      const dishId = action.payload.dishId;

      state.data[dishId].isSelected = true;
    },

    unselect(
      state,
      action: PayloadAction<TSelectProps>,
    ) {
      const dishId = action.payload.dishId;

      state.data[dishId].isSelected = false;
    },
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      _,
      action: PayloadAction<TStartgameProps>,
    ): TDishes {
      const dishesIds = action.payload.dishesIds;
      const newDishes: TDish[] = dishesIds
        .map(dishId => ({
          id: dishId,
          isSelected: false,
        }));

      return {
        data: newDishes.reduce<{ [key: string]: TDish }>((prev, curr) => {
          prev[curr.id] = curr;
          return prev;
        }, {}),
        ids: dishesIds,
        ingredients: {},
      };
    },

    [clientsSlice.actions.setOk.type](
      state,
      action: PayloadAction<TSetOkProps>,
    ) {
      const dishId = action.payload.dishId;

      state.ingredients[dishId] = [];
      state.data[dishId].isSelected = false;
    },

    [clientsSlice.actions.setKo.type](
      state,
      action: PayloadAction<TSetOkProps>,
    ) {
      const dishId = action.payload.dishId;

      state.ingredients[dishId] = [];
      state.data[dishId].isSelected = false;
    },
  },
});

export default slice;
