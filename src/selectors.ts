import { TState } from "./types";

export const selectDishes = (state: TState) =>
  Object.values(state.dishes.data);

export const selectTables = (state: TState) =>
  Object.values(state.tables.data);

export const selectClient = (id: string) =>
  (state: TState) =>
    state.clients.data[id];

export const selectClients = (tableId: string) =>
  (state: TState) => {
    const tableClients = state.tables.clients[tableId] || []
    return tableClients.map(clientId => selectClient(clientId)(state))
  };

