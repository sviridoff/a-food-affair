import { createSelector } from 'reselect';

import {
  TState,
  TDishes,
  TTables,
  TClients,
  TDish,
  TIngredients
} from './types';

export const selectDishes = createSelector(
  (state: TState) => state.dishes,
  (dishes: TDishes) => Object.values(dishes.data),
);

export const selectDishesIds = (state: TState) => state.dishes.ids;

export const selectDish = createSelector(
  (state: TState, dishId: string) => state.dishes.data[dishId],
  (dish: TDish) => dish,
);

export const selectTables = createSelector(
  (state: TState) => state.tables,
  (tables: TTables) => Object.values(tables.data),
);

export const makeSelectClients = () => {
  const defaultClientsIds: string[] = [];

  return createSelector(
    (state: TState, tableId: string) =>
      state.tables.clients[tableId] || defaultClientsIds,
    (state: TState) => state.clients,
    (clientsIds: string[], clients: TClients) =>
      clientsIds.map(id => clients.data[id]),
  );
}

export const makeSelectIngredients = () => {
  const defaultIngredientsIds: string[] = [];

  return createSelector(
    (state: TState, dishId: string) =>
      state.dishes.ingredients[dishId] || defaultIngredientsIds,
    (state: TState) => state.ingredients,
    (ingredientsIds: string[], ingredients: TIngredients) => {
      return ingredientsIds
        .map(id => ingredients.data[id])
        .reverse();
    }
  );
};

export const selectIngredients = createSelector(
  (state: TState) => state.ingredients,
  (ingredients: TIngredients) => Object.values(ingredients.data),
);
