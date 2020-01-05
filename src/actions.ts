import { batch } from 'react-redux';
import uuid from 'uuid/v4';
import { SyntheticEvent } from 'react';

import {
  TThunk,
  ClientStatus,
  TClients,
  TTables,
  TLevel,
  VisibleModalType,
  GameStatus,
} from './types';
import dishesSlice from './slices/dishesSlice';
import uiSlice from './slices/uiSlice';
import clientsSlice from './slices/clientsSlice';
import tablesSlice from './slices/tablesSlice';
import profileSlice from './slices/profileSlice';
import gameSlice from './slices/gameSlice';
import levelsSlice from './slices/levelsSlice';
import store from './store';
import { btnEffect, wiggleEffect } from './libs/btnEffect';

let currentTime = Date.now();

export const chooseDish = (
  dishId: string,
  event: SyntheticEvent,
): TThunk<void> =>
  (dispatch, getState) => {
    const { dishes, ui } = getState();
    const isSelected = dishes.data[dishId].isSelected;

    if (!isSelected) {
      const selectedDish = ui.selectedDish && dishId !== ui.selectedDish
        ? ui.selectedDish
        : null;

      if (selectedDish) {
        dispatch(dishesSlice.actions.copy({
          dishId,
          selectedDishId: selectedDish,
        }));

        wiggleEffect(() => { })(event);
      }

      if (!selectedDish) {
        const ingredients = dishes.ingredients[dishId] || [];
        const hasIngredients = Boolean(ingredients.length);

        if (hasIngredients) {
          btnEffect(() =>
            dispatch(dishesSlice.actions.select({
              dishId,
            }))
          )(event);
        }

        if (!hasIngredients) {
          btnEffect(() =>
            dispatch(uiSlice.actions.showIngredientsStore({
              dishId,
            }))
          )(event);
        }
      }
    }

    if (isSelected) {
      btnEffect(() =>
        dispatch(dishesSlice.actions.unselect({
          dishId,
        }))
      )(event);
    }
  };

export const chooseIngredient = (ingredientId: string): TThunk<void> =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      dispatch(dishesSlice.actions.addIngredient({
        dishId,
        ingredientId,
      }));
    }
  };

export const closeIngredientsStore = (): TThunk<void> =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      dispatch(uiSlice.actions.closeIngredientsStore());
    }
  };

export const chooseClient = (
  clientId: string,
  recipeId: string,
  event: SyntheticEvent,
): TThunk<void> =>
  (dispatch, getState) => {
    const { ui, recipes, dishes, profile } = getState();
    const dishId = ui.selectedDish;

    if (profile.lives <= 0) {
      return;
    }

    if (dishId) {
      batch(() => {
        const recipeIngredients = recipes.ingredients[recipeId].slice().sort();
        const dishIngredients = dishes.ingredients[dishId].slice().sort();
        const areEqual = recipeIngredients.length === dishIngredients.length
          && recipeIngredients
            .every((ingredient, index) => ingredient === dishIngredients[index]);

        if (areEqual) {
          dispatch(clientsSlice.actions.updateStatus({
            status: ClientStatus.OK,
            clientId,
          }));
        }

        if (!areEqual) {
          dispatch(clientsSlice.actions.updateStatus({
            status: ClientStatus.KO,
            clientId,
          }));
          dispatch(profileSlice.actions.decreaseLive());
        }

        dispatch(dishesSlice.actions.removeAllIngredients({ dishId }));
        dispatch(uiSlice.actions.selectDish({ dishId: null }));
        dispatch(dishesSlice.actions.unselect({ dishId }));

        dispatch(checkForRemoveTable(clientId));
      });

      wiggleEffect(() => { })(event);
    }

    if (!dishId) {
      btnEffect(
        () => batch(() => {
          dispatch(uiSlice.actions.selectRecipe({ recipeId }));
          dispatch(uiSlice.actions.selectVisibleModalType({
            modalType: VisibleModalType.RECIPES,
          }));
        })
      )(event);
    }
  };

const checkForEndgame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { profile, game, levels, tables } = getState();

    batch(() => {
      // Lose.
      if (profile.lives <= 0) {
        dispatch(gameSlice.actions.selectStatus({ status: GameStatus.LOSE_STOP }));
        dispatch(uiSlice.actions.selectVisibleModalType({
          modalType: VisibleModalType.RESTARTPAGE,
        }));
      }

      const level = levels.data[profile.levelId];

      // Win.
      if (
        profile.lives > 0
        && game.tables === level.maxTables
        && !tables.ids.length
      ) {
        const nextLevel = profile.levelId < Object.keys(levels.data).length
          ? profile.levelId + 1
          : null;

        if (nextLevel) {
          dispatch(levelsSlice.actions.unlockLevel({
            level: nextLevel
          }));
          dispatch(profileSlice.actions.selectLevel({
            levelId: nextLevel
          }));
        }

        dispatch(gameSlice.actions.selectStatus({ status: GameStatus.WIN_STOP }));
        dispatch(uiSlice.actions.selectVisibleModalType({
          modalType: VisibleModalType.RESTARTPAGE,
        }));
      }
    });
  }

const checkForRemoveTable = (clientId: string): TThunk<void> =>
  (dispatch, getState) => {
    const { clients, tables } = getState();

    const tableId = clients.tables[clientId];

    if (tables.data[tableId].liveTime) {
      return;
    }

    const tableClientsIds = tables.clients[tableId];
    const isTableAttended = tableClientsIds
      .every(id => clients.data[id].status !== ClientStatus.WIP);

    if (isTableAttended) {
      const coins = tableClientsIds.reduce((prev, id) => {
        const client = clients.data[id];
        return prev + client.status === ClientStatus.OK ? client.coins : 0;
      }, 0);

      if (coins) {
        dispatch(profileSlice.actions.increseCoins({ coins }));
      }

      dispatch(tablesSlice.actions.selectLiveTime({
        tableId,
        liveTime: currentTime + 2000,
      }));
    }
  }


export const clearDish = (): TThunk<void> =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      dispatch(dishesSlice.actions.clear({
        dishId,
      }));
    }
  };

export const startgameLavel = (levelId: number): TThunk<void> =>
  (dispatch, getState) => {
    const { levels } = getState();
    const level = levels.data[levelId];

    dispatch(gameSlice.actions.startgame({
      currentTime,
      levelId,
      lives: level.lives,
      dishesIds: Array.from(new Array(level.dishes))
        .map(() => uuid()),
    }));
  };

export const createTable = (): TThunk<void> =>
  (dispatch, getState) => {
    const { levels, profile, recipes } = getState();

    const levelId = profile.levelId;
    const level: TLevel = levels.data[levelId];
    const tableId = uuid();
    const clientsRandom = level.randomTables
      ? Math.floor(Math.random() * level.maxClients) + 1
      : level.maxClients;
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
      const recipeIngredients = recipes.ingredients[recipeId];

      clients.data[clientId] = {
        id: clientId,
        status: ClientStatus.WIP,
        coins: 100,
        createdAt: currentTime,
        liveTime: currentTime
          + (recipeIngredients.length * level.timePerIngredient),
      };

      clients.recipes[clientId] = recipeId;

      clients.ids.push(clientId);

      clients.tables[clientId] = tableId;
    });

    const tables: TTables = {
      data: {
        [tableId]: {
          id: tableId,
          liveTime: 0,
        }
      },
      clients: {
        [tableId]: clientsIds,
      },
      ids: [tableId],
    };

    const maxLiveTime = Math.max(...Object.values(clients.data)
      .map(client => client.liveTime - currentTime));

    dispatch(tablesSlice.actions.addTable({
      tables,
      clients,
      nextTableTime: currentTime + (maxLiveTime * 0.65),
    }));
  };

const checkForRemoveClients = (): TThunk<void> =>
  (dispatch, getState) => {
    const { clients, profile } = getState();

    const clientsIdsToRemove = Object.values(clients.data)
      .filter(client =>
        client.status === ClientStatus.WIP
        && currentTime >= client.liveTime)
      .map(client => client.id);

    if (clientsIdsToRemove.length) {
      batch(() => {
        dispatch(clientsSlice.actions.updateStatuses({
          status: ClientStatus.KO,
          clientIds: clientsIdsToRemove,
        }));

        dispatch(profileSlice.actions.decreaseLives({
          lives: clientsIdsToRemove.length > profile.lives
            ? profile.lives
            : clientsIdsToRemove.length,
        }));

        clientsIdsToRemove.forEach(clientId => {
          const { clients } = getState();

          if (clients.data[clientId]) {
            dispatch(checkForRemoveTable(clientId));
          }
        });
      });
    }
  };

export const togglePausegame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { ui, game } = getState();

    dispatch(gameSlice.actions.togglePausegame({
      status: game.status === GameStatus.PAUSE
        ? GameStatus.PLAY
        : GameStatus.PAUSE,
      modalType: ui.modalType === VisibleModalType.NONE
        ? VisibleModalType.RESTARTPAGE
        : VisibleModalType.NONE,
    }));
  };

const removeTables = (tablesIds: string[]): TThunk<void> =>
  (dispatch, getState) => {
    const { tables } = getState();

    batch(() => {
      dispatch(tablesSlice.actions.removeTables({
        tablesIds,
        clientsIds: tablesIds
          .flatMap(tableId => tables.clients[tableId]),
      }));
      dispatch(checkForEndgame());
    });
  }

window.setInterval(() => {
  const { game, profile, levels, tables } = store.getState();

  if (game.status !== GameStatus.PLAY) {
    return;
  }

  currentTime += 200;

  store.dispatch(checkForRemoveClients());

  // Start clean tables
  const tablesIds = tables.ids.filter(tableId =>
    tables.data[tableId].liveTime
    && currentTime >= tables.data[tableId].liveTime
  );

  if (tablesIds.length) {
    store.dispatch(removeTables(tablesIds));
  }
  // End clean tables

  // Start create table
  const level = levels.data[profile.levelId];

  if (
    profile.lives > 0
    && game.tables !== level.maxTables
    && currentTime >= game.nextTableTime
  ) {
    store.dispatch(createTable());
  }
  // End create table
}, 200);
