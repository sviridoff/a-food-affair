import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'uuid/v4';

import { TDishes, TDish } from '../types';

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
    d1: ['i1', 'i2', 'i2', 'i3', 'i4'],
    d2: ['i3', 'i2'],
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

type TCreateDishesProps = {
  dishes: number,
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

    restartDishes(state, action: PayloadAction<TCreateDishesProps>) {
      const dishes = action.payload.dishes;

      const newDishes: TDish[] = Array.from(new Array(dishes))
        .map(() => ({
          id: uuid(),
          isSelected: false,
        }));

      state.data = newDishes.reduce<{ [key: string]: TDish }>((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
      }, {});

      state.ids = newDishes.map(dish => dish.id);

      state.ingredients = {};

      return state;
    }
  }
});

export default slice;
