import { batch } from 'react-redux';
import uuid from 'uuid/v4';

import { TThunk, ClientStatus, TState, TClients, TTables, TLevel } from './types'
import { actions as dishesActions } from './reducers/dishesReducer';
import { actions as uiActions } from './reducers/uiReducer';
import { actions as clientsActions } from './reducers/clientsReducer';
import { actions as tablesActions } from './reducers/tablesReducer';
import { actions as profileActions } from './reducers/profileReducer';

export const chooseDish = (dishId: string): TThunk =>
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
            dispatch(uiActions.showIngredientsStore());
          }
        }
      }

      if (isSelected) {
        dispatch(dishesActions.unselect({ dishId }));
        dispatch(uiActions.selectDish({ dishId: null }));
      }
    });
  };

export const chooseIngredient = (ingredientId: string): TThunk =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(dishesActions.addIngredient({ dishId, ingredientId }));
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(uiActions.hideIngredientsStore());
      });
    }
  };

export const closeIngredientsStore = (): TThunk =>
  (dispatch, getState) => {
    const { ui } = getState();
    const dishId = ui.selectedDish;

    if (dishId) {
      batch(() => {
        dispatch(uiActions.selectDish({ dishId: null }));
        dispatch(uiActions.hideIngredientsStore());
      });
    }
  };

export const chooseClient = (clientId: string, recipeId: string): TThunk =>
  (dispatch, getState) => {
    batch(() => {
      const { ui, recipes, dishes } = getState();
      const dishId = ui.selectedDish;

      if (dishId) {
        const recipeIngredients = recipes.ingredients[recipeId].slice().slice();
        const dishIngredients = dishes.ingredients[dishId].slice().sort();
        const areEqual = recipeIngredients.length === dishIngredients.length
          && recipeIngredients
            .every((ingredient, index) => ingredient === dishIngredients[index]);

        if (areEqual) {
          dispatch(clientsActions.updateStatus({
            status: ClientStatus.OK,
            clientId,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId }));
          dispatch(uiActions.selectDish({ dishId: null }));
          dispatch(dishesActions.unselect({ dishId }));
        }

        if (!areEqual) {
          dispatch(clientsActions.updateStatus({
            status: ClientStatus.KO,
            clientId,
          }));
          dispatch(dishesActions.removeAllIngredients({ dishId }));
          dispatch(uiActions.selectDish({ dishId: null }));
          dispatch(dishesActions.unselect({ dishId }));
          dispatch(profileActions.decreaseLive());
        }

        checkForRemoveTable(dispatch, getState, clientId);
      }

      if (!dishId) {
        dispatch(uiActions.selectRecipe({ recipeId }));
        dispatch(uiActions.showRecipes());
      }
    });
  };

const checkForRemoveTable =
  (dispatch: any, getState: () => TState, clientId: string) => {
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


export const clearDish = (): TThunk =>
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

export const startgame = (): TThunk =>
  (dispatch, getState) => {
    batch(() => {
      const { levels, profile } = getState();
      const level = levels.data[profile.level];

      dispatch(dishesActions.restartDishes({
        dishes: level.dishes,
      }));
      dispatch(tablesActions.restartTables());
      dispatch(clientsActions.restartClients());
      dispatch(uiActions.hideStartpage());
    });

    createTable(dispatch, getState);
  };


const createTable = (dispatch: any, getState: any) => {
  const { levels, profile } = getState();

  const levelId = profile.level;
  const level: TLevel = levels.data[levelId];
  const tableId = uuid();
  const clientsIds = Array.from(new Array(level.maxClients))
    .map(uuid);

  const clients: TClients = {
    data: {},
    recipes: {},
    ids: [],
    tables: {},
  };

  clientsIds.forEach(clientId => {
    const recipe = Math.floor(Math.random() * levels.recipes[levelId].length);

    clients.data[clientId] = {
      id: clientId,
      status: ClientStatus.WIP,
      coins: 100,
    };

    clients.recipes[clientId] = levels.recipes[levelId][recipe];

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
  };

  batch(() => {
    dispatch(clientsActions.addClients({ clients }));
    dispatch(tablesActions.addTable({ tables }));
  });
}
