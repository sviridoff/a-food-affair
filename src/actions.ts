import { TThunk } from "./types"
import { batch } from "react-redux";

import { actions as dishesActions } from './reducers/dishesReducer';
import { actions as uiActions } from './reducers/uiReducer';

export const chooseDish = (dishId: string): TThunk =>
  (dispatch, getState) => {
    const { dishes } = getState();
    const isSelected = dishes.data[dishId].isSelected;

    if (!isSelected) {
      const anotherSelectedDish = Object.values(dishes.data)
        .find(dish => dish.isSelected && dish.id !== dishId);

      if (anotherSelectedDish) {
        const ingredients =
          dishes.ingredients[anotherSelectedDish.id] || [];

        batch(() => {
          dispatch(dishesActions.addIngredients({
            dishId,
            ingredients,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId: anotherSelectedDish.id }));
          dispatch(dishesActions.deselect({ dishId: anotherSelectedDish.id }));
        });
      }

      if (!anotherSelectedDish) {
        const ingredients = dishes.ingredients[dishId] || [];
        const hasIngredients = Boolean(ingredients.length);

        if (hasIngredients) {
          dispatch(dishesActions.select({ dishId }));
        }

        if (!hasIngredients) {
          batch(() => {
            dispatch(dishesActions.select({ dishId }));
            dispatch(uiActions.showIngredientsStore());
          });
        }
      }
    }

    if (isSelected) {
      dispatch(dishesActions.deselect({ dishId }));
    }
  };

export const chooseIngredient = (ingredientId: string): TThunk =>
  (dispatch, getState) => {
    const { dishes } = getState();
    const dish = Object.values(dishes.data)
      .find(dish => dish.isSelected);

    if (dish) {
      const dishId = dish.id;

      batch(() => {
        dispatch(dishesActions.addIngredient({ dishId, ingredientId }));
        dispatch(dishesActions.deselect({ dishId }))
        dispatch(uiActions.hideIngredientsStore());
      });
    }
  };

export const closeIngredientsStore = (): TThunk =>
  (dispatch, getState) => {
    const { dishes } = getState();
    const dish = Object.values(dishes.data)
      .find(dish => dish.isSelected);

    if (dish) {
      const dishId = dish.id;

      batch(() => {
        dispatch(dishesActions.deselect({ dishId }))
        dispatch(uiActions.hideIngredientsStore());
      });
    }
  };
