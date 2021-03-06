import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action } from '@reduxjs/toolkit'

import { reducer } from "./store";

export enum ClientStatus {
  WIP,
  OK,
  KO,
};

export type TTimer = {
  currentTime: number,
};

export type TTable = {
  id: string,
};

export type TTables = {
  data: { [key: string]: TTable },
  clients: { [key: string]: string[] },
  ids: string[],
};

export type TClient = {
  id: string,
  status: ClientStatus,
  coins: number,
  createdAt: number,
  liveTime: number,
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

export enum VisibleModalType {
  NONE,
  INGREDIENTS_STORE,
  RECIPES,
  RESTARTPAGE,
};

export type TUi = {
  modalType: VisibleModalType,
  selectedRecipeId: string | null,
  selectedDishId: string | null,
};

export type TRecipe = {
  id: string,
};

export type TRecipes = {
  data: { [key: string]: TIngredient },
  ingredients: { [key: string]: string[] },
};

export enum GameStatus {
  FIRST_STOP,
  LOSE_STOP,
  PAUSE,
  PLAY,
  WIN_STOP,
};

export type TProfile = {
  lives: number,
  coins: number,
  levelId: number,
};

export type TLevel = {
  id: string,
  dishes: number,
  lives: number,
  maxClients: number,
  maxTables: number,
  timePerIngredient: number,
  isLock: boolean,
  randomTables: boolean,
};

export type TLevels = {
  data: { [key: string]: TLevel },
  recipes: { [key: string]: string[] },
};

export type TGame = {
  status: GameStatus,
  tables: number,
  nextTableTime: number,
  combo: number,
};

export type TState = ReturnType<typeof reducer>;

export type TThunk<R> = ThunkAction<R, TState, null, Action<string>>;

export type TThunkDispatch = ThunkDispatch<TState, null, Action<string>>;
