import { batch } from 'react-redux';
import uuid from 'uuid/v4';

import {
  TThunk,
  ClientStatus,
  TClients,
  TTables,
  TLevel,
  VisibleModalType,
  GameStatus,
} from './types';
import { actions as dishesActions } from './reducers/dishesReducer';
import { actions as uiActions } from './reducers/uiReducer';
import { actions as clientsActions } from './reducers/clientsReducer';
import { actions as tablesActions } from './reducers/tablesReducer';
import { actions as profileActions } from './reducers/profileReducer';
import { actions as gameActions } from './reducers/gameReducer';
import store from './store';

export const chooseDish = (dishId: string): TThunk<void> =>
  (dispatch, getState) => {
    batch(() => {
      const { dishes, ui } = getState();
      const isSelected = dishes.data[dishId].isSelected;

      if (!isSelected) {
        const selectedDish = ui.selectedDish && dishId !== ui.selectedDish
          ? ui.selectedDish
          : null;

        if (selectedDish) {
          const ingredients =
            dishes.ingredients[selectedDish] || [];

          dispatch(dishesActions.addIngredients({
            dishId,
            ingredients,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId: selectedDish }));
          dispatch(uiActions.selectDish({ dishId: null }));
          dispatch(dishesActions.unselect({ dishId: selectedDish }));
        }

        if (!selectedDish) {
          const ingredients = dishes.ingredients[dishId] || [];
          const hasIngredients = Boolean(ingredients.length);

          if (hasIngredients) {
            dispatch(dishesActions.select({ dishId }));
            dispatch(uiActions.selectDish({ dishId }));
          }

          if (!hasIngredients) {
            dispatch(uiActions.selectDish({ dishId }));
            dispatch(uiActions.selectVisibleModalType({
              modalType: VisibleModalType.INGREDIENTS_STORE,
            }));
          }
        }
      }

      if (isSelected) {
        dispatch(dishesActions.unselect({ dishId }));
        dispatch(uiActions.selectDish({ dishId: null }));
      }
    });
  };

export const chooseIngredient = (ingredientId: string): TThunk<void> =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(dishesActions.addIngredient({ dishId, ingredientId }));
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(uiActions.selectVisibleModalType({
          modalType: VisibleModalType.NONE,
        }));
      });
    }
  };

export const closeIngredientsStore = (): TThunk<void> =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(uiActions.selectVisibleModalType({
          modalType: VisibleModalType.NONE,
        }));
      });
    }
  };

export const chooseClient = (clientId: string, recipeId: string): TThunk<void> =>
  (dispatch, getState) => {
    batch(() => {
      const { ui, recipes, dishes } = getState();
      const dishId = ui.selectedDish;

      if (dishId) {
        const recipeIngredients = recipes.ingredients[recipeId].slice().sort();
        const dishIngredients = dishes.ingredients[dishId].slice().sort();
        const areEqual = recipeIngredients.length === dishIngredients.length
          && recipeIngredients
            .every((ingredient, index) => ingredient === dishIngredients[index]);

        if (areEqual) {
          dispatch(clientsActions.updateStatus({
            status: ClientStatus.OK,
            clientId,
          }));
        }

        if (!areEqual) {
          dispatch(clientsActions.updateStatus({
            status: ClientStatus.KO,
            clientId,
          }));
          dispatch(profileActions.decreaseLive());
          dispatch(checkForEndgame());
        }

        dispatch(dishesActions.removeAllIngredients({ dishId }));
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(dishesActions.unselect({ dishId }));
        dispatch(checkForRemoveTable(clientId));
      }

      if (!dishId) {
        dispatch(uiActions.selectRecipe({ recipeId }));
        dispatch(uiActions.selectVisibleModalType({
          modalType: VisibleModalType.RECIPES,
        }));
      }
    });
  };

const checkForEndgame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { profile } = getState();

    if (profile.lives < 0) {
      dispatch(gameActions.selectStatus({ status: GameStatus.PAUSE }));
      dispatch(uiActions.selectVisibleModalType({
        modalType: VisibleModalType.RESTARTPAGE,
      }));
    }
  }

const checkForRemoveTable = (clientId: string): TThunk<void> =>
  (dispatch, getState) => {
    const { clients, tables } = getState();

    const tableId = clients.tables[clientId];
    const tableClientsIds = tables.clients[tableId];
    const isTableAttended = tableClientsIds
      .every(id => clients.data[id].status !== ClientStatus.WIP);

    if (isTableAttended) {
      const coins = tableClientsIds.reduce((prev, id) => {
        const client = clients.data[id];
        prev += client.status === ClientStatus.OK ? client.coins : 0;
        return prev;
      }, 0);

      if (coins) {
        dispatch(profileActions.increseCoins({ coins }));
      }

      dispatch(tablesActions.removeTable({ tableId }));
      dispatch(clientsActions.removeClients({ clientsIds: tableClientsIds }));
    }
  }


export const clearDish = (): TThunk<void> =>
  (dispatch, getState) => {
    batch(() => {
      const { ui } = getState();
      const dishId = ui.selectedDish;

      if (dishId) {
        dispatch(dishesActions.unselect({ dishId }));
        dispatch(dishesActions.removeAllIngredients({ dishId }));
        dispatch(uiActions.selectDish({ dishId: null }));
      }
    });
  };

export const startgame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { levels, profile } = getState();
    const level = levels.data[profile.level];

    batch(() => {
      dispatch(dishesActions.restartDishes({
        dishes: level.dishes,
      }));
      dispatch(tablesActions.restartTables());
      dispatch(clientsActions.restartClients());
      dispatch(profileActions.restartProfile());
      dispatch(uiActions.selectVisibleModalType({
        modalType: VisibleModalType.NONE,
      }));
      dispatch(gameActions.selectCreatedAt({ createdAt: Date.now() }))
      dispatch(gameActions.selectStatus({ status: GameStatus.PLAY }));
    });
  };

export const createTable = (): TThunk<void> =>
  (dispatch, getState) => {
    const { levels, profile } = getState();

    const levelId = profile.level;
    const level: TLevel = levels.data[levelId];
    const tableId = uuid();
    const clientsRandom = Math.floor(Math.random() * level.maxClients) + 1;
    const clientsIds = Array.from(new Array(clientsRandom))
      .map(() => uuid());

    const clients: TClients = {
      data: {},
      recipes: {},
      ids: [],
      tables: {},
    };

    clientsIds.forEach(clientId => {
      const recipeRandom = Math.floor(Math.random() * levels.recipes[levelId].length);
      const recipeId = levels.recipes[levelId][recipeRandom];

      clients.data[clientId] = {
        id: clientId,
        status: ClientStatus.WIP,
        coins: 100,
        createdAt: Date.now(),
      };

      clients.recipes[clientId] = recipeId;

      clients.ids.push(clientId);

      clients.tables[clientId] = tableId;
    });

    const tables: TTables = {
      data: {
        [tableId]: {
          id: tableId,
        }
      },
      clients: {
        [tableId]: clientsIds,
      },
      ids: [tableId],
    };

    batch(() => {
      dispatch(profileActions.increaseTables());
      dispatch(clientsActions.addClients({ clients }));
      dispatch(tablesActions.addTable({ tables }));
    });
  };

let currentTime = Date.now();

window.setInterval(() => {
  const { game, profile, levels } = store.getState();

  if (game.status === GameStatus.PAUSE) {
    return;
  }

  currentTime += 200;

  const level = levels.data[profile.level];

  if (
    profile.tables !== level.maxTables
    && currentTime - game.createdAt >= 1000 * (profile.tables + 1)
  ) {
    store.dispatch(createTable());
  }
}, 200);
