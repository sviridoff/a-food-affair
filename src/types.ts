import { reducer } from "./store";

export type TTable = {
  id: string,
};

export type TTables = {
  data: { [key: string]: TTable },
  clients: { [key: string]: string[] },
};

export type TClient = {
  id: string,
};

export type TClients = {
  data: { [key: string]: TClient },
};

export type TDish = {
  id: string,
  isSelected: boolean,
};

export type TDishes = {
  data: { [key: string]: TDish },
  ids: string[],
};

export type TState = ReturnType<typeof reducer>;
