import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TDishes, TDish } from '../types';
import gameSlice, { TStartgameProps } from './gameSlice';

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

type TSelectProps = {
  dishId: string,
};

type TAddIngredientsProps = {
  dishId: string,
  ingredients: string[],
};

type TAddIngredientProps = {
  dishId: string,
  ingredientId: string,
};

type TClearProps = {
  dishId: string,
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

    addIngredient(state, action: PayloadAction<TAddIngredientProps>) {
      const { dishId, ingredientId } = action.payload;

      state.ingredients[dishId] = state.ingredients[dishId] || [];
      state.ingredients[dishId].push(ingredientId);
    },

    removeAllIngredients(state, action: PayloadAction<TSelectProps>) {
      const dishId = action.payload.dishId;

      state.ingredients[dishId] = [];

      return state;
    },

    clear(state, action: PayloadAction<TClearProps>) {
      const dishId = action.payload.dishId;

      state.ingredients[dishId] = [];
      state.data[dishId].isSelected = false;
    }
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      state,
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
  },
});

export default slice;
