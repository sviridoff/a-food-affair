import { TThunk } from "./types"
import { batch } from "react-redux";

import { actions as dishesActions } from './reducers/dishesReducer';
import { actions as uiActions } from './reducers/uiReducer';

export const showIngredientsStore = (): TThunk =>
  dispatch =>
    batch(() => {
      dispatch(dishesActions.deselectAllDishes());
      dispatch(uiActions.showIngredientsStore());
    });
