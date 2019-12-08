import { ThunkAction } from 'redux-thunk'
import { Action } from '@reduxjs/toolkit'

import { reducer } from "./store";

export enum ClientStatus {
  WIP,
  OK,
  KO,
};

export type TTable = {
  id: string,
};

export type TTables = {
  data: { [key: string]: TTable },
  clients: { [key: string]: string[] },
};

export type TClient = {
  id: string,
  status: ClientStatus,
  coins: number,
};

export type TClients = {
  data: { [key: string]: TClient },
  recipes: { [key: string]: string },
  ids: string[],
  tables: { [key: string]: string },
};

export type TDish = {
  id: string,
  isSelected: boolean,
};

export type TDishes = {
  data: { [key: string]: TDish },
  ids: string[],
  ingredients: { [key: string]: string[] },
};

export type TIngredient = {
  id: string,
};

export type TIngredients = {
  data: { [key: string]: TIngredient },
  ids: string[],
};

export type TUi = {
  isIngredientsStoreVisible: boolean,
  isRecipesVisible: boolean,
  selectedRecipe: string | null,
  selectedDish: string | null,
};

export type TRecipe = {
  id: string,
};

export type TRecipes = {
  data: { [key: string]: TIngredient },
  ingredients: { [key: string]: string[] },
};

export type TProfile = {
  lives: number,
  coins: number,
}

export type TState = ReturnType<typeof reducer>;

export type TThunk = ThunkAction<void, TState, null, Action<string>>;
