import { createSelector } from 'reselect';

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

export const selectTables = createSelector(
  (state: TState) => state.tables.data,
  (tablesData: { [key: string]: TTable }) => Object.values(tablesData),
);

export const makeSelectClients = () => {
  const defaultClientsIds: string[] = [];

  return createSelector(
    (state: TState, tableId: string) =>
      state.tables.clients[tableId] || defaultClientsIds,
    (state: TState) => state.clients.data,
    (clientsIds: string[], clientsData: { [key: string]: TClient }) =>
      clientsIds.map(id => clientsData[id]),
  );
}

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

export const selectIngredients = createSelector(
  (state: TState) => state.ingredients.data,
  (ingredientsData: { [key: string]: TIngredient }) =>
    Object.values(ingredientsData),
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
