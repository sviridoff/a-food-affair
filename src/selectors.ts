import { createSelector } from '@reduxjs/toolkit';
import { reverse } from 'ramda';

import {
  TState,
  TClient,
  TDish,
  TIngredient,
  TTable,
} from './types';

export const selectDishes = createSelector(
  (state: TState) => state.dishes.data,
  (dishesData: { [key: string]: TDish }) => Object.values(dishesData),
);

export const selectDishesIds = (state: TState) => state.dishes.ids;

export const selectDish = createSelector(
  (state: TState, dishId: string) => state.dishes.data[dishId],
  (dish: TDish) => dish,
);

export const selectTablesIds = createSelector(
  (state: TState) => state.tables.ids,
  (ids: string[]) => reverse(ids),
);

export const selectTables = createSelector(
  (state: TState) => state.tables.data,
  (tablesData: { [key: string]: TTable }) => Object.values(tablesData),
);

export const selectClients = createSelector(
  (state: TState, tableId: string) =>
    state.tables.clients[tableId] || [],
  (clientsIds: string[]) => clientsIds,
);

export const makeSelectIngredients = () => {
  const defaultIngredientsIds: string[] = [];

  return createSelector(
    (state: TState, dishId: string) =>
      state.dishes.ingredients[dishId] || defaultIngredientsIds,
    (state: TState) => state.ingredients.data,
    (
      ingredientsIds: string[],
      ingredientsData: { [key: string]: TIngredient }
    ) => {
      return ingredientsIds
        .map(id => ingredientsData[id])
        .reverse();
    }
  );
};

export const selectLevelIngredientsIds = createSelector(
  (state: TState) => state.profile.levelId,
  (state: TState) => state.levels.recipes,
  (state: TState) => state.recipes.ingredients,
  (
    levelId: number,
    levelsRecipes: { [key: string]: string[] },
    recipeIngredients: { [key: string]: string[] },
  ) => Array.from(new Set(levelsRecipes[levelId]
    .flatMap(recipeId => recipeIngredients[recipeId]))),
);

export const selectClient = createSelector(
  (state: TState, clientId: string) => state.clients.data[clientId],
  (client: TClient) => client,
);

export const selectClientRecipe = createSelector(
  (state: TState, clientId: string) => state.clients.recipes[clientId],
  (recipe: string) => recipe,
);

export const selectClientIngredients = createSelector(
  (state: TState) => state.ui.selectedRecipe,
  (state: TState) => state.recipes.ingredients,
  (state: TState) => state.ingredients.data,
  (
    recipeId: string | null,
    recipesIngredients: { [key: string]: string[] },
    ingredientsData: { [key: string]: TIngredient },
  ) => {
    let ingredients: TIngredient[] = [];

    if (recipeId) {
      const ingredientsIds = recipesIngredients[recipeId];
      ingredients = ingredientsIds
        .map(id => ingredientsData[id]);
    }

    return ingredients;
  }
);
