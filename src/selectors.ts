import { createSelector } from 'reselect';

import { TState, TDishes, TTables, TClients, TDish } from './types';

export const selectDishes = createSelector(
  (state: TState) => state.dishes,
  (dishes: TDishes) => Object.values(dishes.data),
);

export const selectDishesIds = createSelector(
  (state: TState) => state.dishes.ids,
  (dishesIds: string[]) => dishesIds,
);

export const selectDish = createSelector(
  (state: TState, dishId: string) => state.dishes.data[dishId],
  (dish: TDish) => dish,
);

export const selectTables = createSelector(
  (state: TState) => state.tables,
  (tables: TTables) => Object.values(tables.data),
);

export const makeSelectClients = () => createSelector(
  (state: TState, tableId: string) => state.tables.clients[tableId] || [],
  (state: TState, tableId: string) => state.clients,
  (tableClients: string[], clients: TClients) =>
    tableClients.map(clientId => clients.data[clientId]),
);
