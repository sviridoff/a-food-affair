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
  const emptyArray: string[] = [];

  return createSelector(
    (state: TState, tableId: string) => state.tables.clients[tableId] || emptyArray,
    (state: TState) => state.clients,
    (clientsIds: string[], clients: TClients) =>
      clientsIds.map(id => clients.data[id]),
  );
}

export const makeSelectIngredients = () => {
  const emptyArray: string[] = [];

  return createSelector(
    (state: TState, dishId: string) => state.dishes.ingredients[dishId] || emptyArray,
    (state: TState) => state.ingredients,
    (ingredientsIds: string[], ingredients: TIngredients) =>
      ingredientsIds.map(id => ingredients.data[id])
  );
};
