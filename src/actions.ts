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
        const ingredients =
          dishes.ingredients[selectedDish] || [];

        batch(() => {
          dispatch(dishesSlice.actions.addIngredients({
            dishId,
            ingredients,
          }));
          dispatch(dishesSlice.actions.removeAllIngredients({ dishId: selectedDish }));
          dispatch(uiSlice.actions.selectDish({ dishId: null }));
          dispatch(dishesSlice.actions.unselect({ dishId: selectedDish }));
        });

        wiggleEffect(() => { })(event);
      }

      if (!selectedDish) {
        const ingredients = dishes.ingredients[dishId] || [];
        const hasIngredients = Boolean(ingredients.length);

        if (hasIngredients) {
          btnEffect(
            () => batch(() => {
              dispatch(dishesSlice.actions.select({ dishId }));
              dispatch(uiSlice.actions.selectDish({ dishId }));
            })
          )(event);
        }

        if (!hasIngredients) {
          btnEffect(
            () => batch(() => {
              dispatch(uiSlice.actions.selectDish({ dishId }));
              dispatch(uiSlice.actions.selectVisibleModalType({
                modalType: VisibleModalType.INGREDIENTS_STORE,
              }));
            })
          )(event);
        }
      }
    }

    if (isSelected) {
      btnEffect(
        () => batch(() => {
          dispatch(dishesSlice.actions.unselect({ dishId }));
          dispatch(uiSlice.actions.selectDish({ dishId: null }));
        })
      )(event);
    }
  };

export const chooseIngredient = (ingredientId: string): TThunk<void> =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(dishesSlice.actions.addIngredient({ dishId, ingredientId }));
        dispatch(uiSlice.actions.selectDish({ dishId: null }));
        dispatch(uiSlice.actions.selectVisibleModalType({
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
        dispatch(uiSlice.actions.selectDish({ dishId: null }));
        dispatch(uiSlice.actions.selectVisibleModalType({
          modalType: VisibleModalType.NONE,
        }));
      });
    }
  };

export const chooseClient = (
  clientId: string,
  recipeId: string,
  event: SyntheticEvent,
): TThunk<void> =>
  (dispatch, getState) => {
    const { ui, recipes, dishes } = getState();
    const dishId = ui.selectedDish;

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
        dispatch(checkForEndgame());
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

    // Lose.
    if (profile.lives <= 0) {
      dispatch(gameSlice.actions.selectStatus({ status: GameStatus.LOSE_STOP }));
      dispatch(uiSlice.actions.selectVisibleModalType({
        modalType: VisibleModalType.RESTARTPAGE,
      }));
    }

    const level = levels.data[profile.level];

    // Win.
    if (
      profile.lives > 0
      && game.tables === level.maxTables
      && !tables.ids.length
    ) {
      const nextLevel = profile.level < Object.keys(levels.data).length
        ? profile.level + 1
        : null;

      if (nextLevel) {
        dispatch(levelsSlice.actions.unlockLevel({
          level: nextLevel
        }));
        dispatch(profileSlice.actions.selectLevel({
          level: nextLevel
        }));
      }

      dispatch(gameSlice.actions.selectStatus({ status: GameStatus.WIN_STOP }));
      dispatch(uiSlice.actions.selectVisibleModalType({
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
        return prev + client.status === ClientStatus.OK ? client.coins : 0;
      }, 0);

      if (coins) {
        dispatch(profileSlice.actions.increseCoins({ coins }));
      }

      dispatch(tablesSlice.actions.removeTable({ tableId }));
      dispatch(clientsSlice.actions.removeClients({ clientsIds: tableClientsIds }));
    }
  }


export const clearDish = (): TThunk<void> =>
  (dispatch, getState) => {
    batch(() => {
      const { ui } = getState();
      const dishId = ui.selectedDish;

      if (dishId) {
        dispatch(dishesSlice.actions.unselect({ dishId }));
        dispatch(dishesSlice.actions.removeAllIngredients({ dishId }));
        dispatch(uiSlice.actions.selectDish({ dishId: null }));
      }
    });
  };

export const startgame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { levels, profile } = getState();
    const level = levels.data[profile.level];

    batch(() => {
      dispatch(dishesSlice.actions.restartDishes({
        dishes: level.dishes,
      }));
      dispatch(tablesSlice.actions.restartTables());
      dispatch(clientsSlice.actions.restartClients());
      dispatch(profileSlice.actions.restartProfile({
        lives: levels.data[profile.level].lives,
      }));
      dispatch(gameSlice.actions.restartGame({
        nextTableTime: currentTime + 2000,
      }));
      dispatch(uiSlice.actions.selectVisibleModalType({
        modalType: VisibleModalType.NONE,
      }));
      dispatch(gameSlice.actions.selectStatus({ status: GameStatus.PLAY }));
    });
  };

export const startgameLavel = (level: number): TThunk<void> =>
  dispatch => {
    batch(() => {
      dispatch(profileSlice.actions.selectLevel({ level }));
      dispatch(startgame());
    });
  };

export const createTable = (): TThunk<void> =>
  (dispatch, getState) => {
    const { levels, profile, recipes } = getState();

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
        }
      },
      clients: {
        [tableId]: clientsIds,
      },
      ids: [tableId],
    };

    const maxLiveTime = Math.max(...Object.values(clients.data)
      .map(client => client.liveTime - currentTime));

    batch(() => {
      dispatch(gameSlice.actions.increaseTables());
      dispatch(clientsSlice.actions.addClients({ clients }));
      dispatch(tablesSlice.actions.addTable({ tables }));
      dispatch(gameSlice.actions.selectNextTableTime({
        nextTableTime: currentTime + (maxLiveTime * 0.65)
      }));
    });
  };

const checkForRemoveClients = (): TThunk<void> =>
  (dispatch, getState) => {
    const { clients } = getState();

    const clientsIdsToRemove = Object.values(clients.data)
      .filter(client => currentTime >= client.liveTime)
      .map(client => client.id);

    if (clientsIdsToRemove.length) {
      batch(() => {
        dispatch(clientsSlice.actions.updateStatuses({
          status: ClientStatus.KO,
          clientIds: clientsIdsToRemove,
        }));
        dispatch(profileSlice.actions.decreaseLives({
          lives: clientsIdsToRemove.length,
        }));
        clientsIdsToRemove.forEach(clientId => {
          const { clients } = getState();

          if (clients.data[clientId]) {
            dispatch(checkForRemoveTable(clientId));
          }
        });
        dispatch(checkForEndgame());
      });
    }
  };

export const resumePauseGame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { ui, game } = getState();

    batch(() => {
      dispatch(gameSlice.actions.selectStatus({
        status: game.status === GameStatus.PAUSE
          ? GameStatus.PLAY
          : GameStatus.PAUSE,
      }));
      dispatch(uiSlice.actions.selectVisibleModalType({
        modalType: ui.modalType === VisibleModalType.NONE
          ? VisibleModalType.RESTARTPAGE
          : VisibleModalType.NONE,
      }));
    });
  };

window.setInterval(() => {
  const { game, profile, levels } = store.getState();

  if (game.status !== GameStatus.PLAY) {
    return;
  }

  currentTime += 200;

  store.dispatch(checkForRemoveClients());

  const level = levels.data[profile.level];

  if (
    game.tables !== level.maxTables
    && currentTime >= game.nextTableTime
  ) {
    store.dispatch(createTable());
  }
}, 200);
