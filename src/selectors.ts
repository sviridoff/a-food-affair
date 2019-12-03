import { createSelector } from 'reselect';

import { TState, TDishes, TTables, TClients } from './types';

export const selectDishes = createSelector(
  (state: TState) => state.dishes,
  (dishes: TDishes) => Object.values(dishes.data),
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
