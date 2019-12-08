import { TThunk, ClientStatus } from "./types"
import { batch } from "react-redux";

import { actions as dishesActions } from './reducers/dishesReducer';
import { actions as uiActions } from './reducers/uiReducer';
import { actions as clientsActions } from './reducers/clientsReducer';

export const chooseDish = (dishId: string): TThunk =>
  (dispatch, getState) => {
    const { dishes, ui } = getState();
    const isSelected = dishes.data[dishId].isSelected;

    if (!isSelected) {
      const selectedDish = ui.selectedDish && dishId !== ui.selectedDish
        ? ui.selectedDish
        : null;

      if (selectedDish) {
        const ingredients =
          dishes.ingredients[selectedDish] || [];

        batch(() => {
          dispatch(dishesActions.addIngredients({
            dishId,
            ingredients,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId: selectedDish }));
          dispatch(uiActions.selectDish({ dishId: null }));
          dispatch(dishesActions.deselect({ dishId: selectedDish }));
        });
      }

      if (!selectedDish) {
        const ingredients = dishes.ingredients[dishId] || [];
        const hasIngredients = Boolean(ingredients.length);

        if (hasIngredients) {
          batch(() => {
            dispatch(dishesActions.select({ dishId }));
            dispatch(uiActions.selectDish({ dishId }));
          });
        }

        if (!hasIngredients) {
          batch(() => {
            dispatch(uiActions.selectDish({ dishId }));
            dispatch(uiActions.showIngredientsStore());
          });
        }
      }
    }

    if (isSelected) {
      batch(() => {
        dispatch(dishesActions.deselect({ dishId }));
        dispatch(uiActions.selectDish({ dishId: null }));
      });
    }
  };

export const chooseIngredient = (ingredientId: string): TThunk =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(dishesActions.addIngredient({ dishId, ingredientId }));
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(uiActions.hideIngredientsStore());
      });
    }
  };

export const closeIngredientsStore = (): TThunk =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(uiActions.hideIngredientsStore());
      });
    }
  };

export const chooseClient = (clientId: string, recipeId: string): TThunk =>
  (dispatch, getState) => {
    const { ui, recipes, dishes } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      const recipeIngredients = recipes.ingredients[recipeId].slice().slice();
      const dishIngredients = dishes.ingredients[dishId].slice().sort();
      const areEqual = recipeIngredients.length === dishIngredients.length
        && recipeIngredients
          .every((ingredient, index) => ingredient === dishIngredients[index]);

      if (areEqual) {
        batch(() => {
          dispatch(clientsActions.updateStatus({
            status: ClientStatus.OK,
            clientId,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId }));
          dispatch(uiActions.selectDish({ dishId: null }));
          dispatch(dishesActions.deselect({ dishId }));
        });
      }

      if (!areEqual) {
        batch(() => {
          dispatch(clientsActions.updateStatus({
            status: ClientStatus.KO,
            clientId,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId }));
          dispatch(uiActions.selectDish({ dishId: null }));
          dispatch(dishesActions.deselect({ dishId }));
        });
      }
    }

    if (!dishId) {
      batch(() => {
        dispatch(uiActions.selectRecipe({ recipeId }));
        dispatch(uiActions.showRecipes());
      });
    }
  };
