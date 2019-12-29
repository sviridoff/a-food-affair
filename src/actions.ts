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
import dishesSlice from './slices/dishesSlice';
import uiSlice from './slices/uiSlice';
import clientsSlice from './slices/clientsSlice';
import tablesSlice from './slices/tablesSlice';
import profileSlice from './slices/profileSlice';
import gameSlice from './slices/gameSlice';
import store from './store';

let currentTime = Date.now();

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

          dispatch(dishesSlice.actions.addIngredients({
            dishId,
            ingredients,
          }));
          dispatch(dishesSlice.actions.removeAllIngredients({ dishId: selectedDish }));
          dispatch(uiSlice.actions.selectDish({ dishId: null }));
          dispatch(dishesSlice.actions.unselect({ dishId: selectedDish }));
        }

        if (!selectedDish) {
          const ingredients = dishes.ingredients[dishId] || [];
          const hasIngredients = Boolean(ingredients.length);

          if (hasIngredients) {
            dispatch(dishesSlice.actions.select({ dishId }));
            dispatch(uiSlice.actions.selectDish({ dishId }));
          }

          if (!hasIngredients) {
            dispatch(uiSlice.actions.selectDish({ dishId }));
            dispatch(uiSlice.actions.selectVisibleModalType({
              modalType: VisibleModalType.INGREDIENTS_STORE,
            }));
          }
        }
      }

      if (isSelected) {
        dispatch(dishesSlice.actions.unselect({ dishId }));
        dispatch(uiSlice.actions.selectDish({ dishId: null }));
      }
    });
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
      }

      if (!dishId) {
        dispatch(uiSlice.actions.selectRecipe({ recipeId }));
        dispatch(uiSlice.actions.selectVisibleModalType({
          modalType: VisibleModalType.RECIPES,
        }));
      }
    });
  };

const checkForEndgame = (): TThunk<void> =>
  (dispatch, getState) => {
    const { profile, game, levels, tables } = getState();

    if (profile.lives < 0) {
      dispatch(gameSlice.actions.selectStatus({ status: GameStatus.PAUSE }));
      dispatch(uiSlice.actions.selectVisibleModalType({
        modalType: VisibleModalType.RESTARTPAGE,
      }));
    }

    const level = levels.data[profile.level];

    if (
      game.tables === level.maxTables
      && !tables.ids.length
    ) {
      dispatch(gameSlice.actions.selectStatus({ status: GameStatus.PAUSE }));
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
        prev += client.status === ClientStatus.OK ? client.coins : 0;
        return prev;
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
      dispatch(profileSlice.actions.restartProfile());
      dispatch(gameSlice.actions.restartGame());
      dispatch(uiSlice.actions.selectVisibleModalType({
        modalType: VisibleModalType.NONE,
      }));
      dispatch(gameSlice.actions.selectStatus({ status: GameStatus.PLAY }));
    });
  };

export const startgameLavel = (level: number): TThunk<void> =>
  (dispatch, getState) => {
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

    batch(() => {
      dispatch(gameSlice.actions.increaseTables());
      dispatch(clientsSlice.actions.addClients({ clients }));
      dispatch(tablesSlice.actions.addTable({ tables }));
      dispatch(gameSlice.actions.selectNextTableTime({
        nextTableTime: currentTime + 1000, // TODO: improve
      }));
    });
  };

const checkForRemoveClients = (): TThunk<void> =>
  (dispatch, getState) => {
    const { clients } = getState();

    const clientsToRemove = Object.values(clients.data)
      .filter(client => currentTime >= client.liveTime);

    if (clientsToRemove.length) {
      batch(() => {
        dispatch(clientsSlice.actions.updateStatuses({
          status: ClientStatus.KO,
          clientIds: clientsToRemove.map(client => client.id),
        }));
        dispatch(profileSlice.actions.decreaseLives({
          lives: clientsToRemove.length,
        }));
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

  if (game.status === GameStatus.PAUSE) {
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
