import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUi, VisibleModalType } from '../types';
import gameSlice, {
  TStartgameProps,
  TToggleResumegameProps,
} from './gameSlice';
import dishesSlice, { TSelectProps } from './dishesSlice';
import clientsSlice from './clientsSlice';

const initialState: TUi = {
  modalType: VisibleModalType.RESTARTPAGE,
  selectedRecipeId: 'donut-oreo',
  selectedDishId: null,
};

type TSelectVisibleModalType = {
  modalType: VisibleModalType,
};

type TShowIngredientsStoreProps = {
  dishId: string,
};

type TShowRecipes = {
  recipeId: string,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectVisibleModalType(
      state,
      action: PayloadAction<TSelectVisibleModalType>
    ) {
      state.modalType = action.payload.modalType;
    },

    closeIngredientsStore(state) {
      state.selectedDishId = null;
      state.modalType = VisibleModalType.NONE;
    },

    showIngredientsStore(
      state,
      action: PayloadAction<TShowIngredientsStoreProps>,
    ) {
      state.selectedDishId = action.payload.dishId;
      state.modalType = VisibleModalType.INGREDIENTS_STORE;
    },

    showRecipes(
      state,
      action: PayloadAction<TShowRecipes>,
    ) {
      state.selectedRecipeId = action.payload.recipeId;
      state.modalType = VisibleModalType.RECIPES;
    },
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      _,
      action: PayloadAction<TStartgameProps>,
    ): TUi {
      return {
        selectedDishId: null,
        selectedRecipeId: initialState.selectedRecipeId,
        modalType: VisibleModalType.NONE,
      };
    },

    [gameSlice.actions.togglePausegame.type](
      state,
      action: PayloadAction<TToggleResumegameProps>
    ) {
      state.modalType = action.payload.modalType;
    },

    [dishesSlice.actions.clear.type](state) {
      state.selectedDishId = null;
    },

    [dishesSlice.actions.addIngredient.type](state) {
      state.selectedDishId = null;
      state.modalType = VisibleModalType.NONE;
    },

    [dishesSlice.actions.copy.type](state) {
      state.selectedDishId = null;
    },

    [dishesSlice.actions.select.type](
      state,
      action: PayloadAction<TSelectProps>,
    ) {
      state.selectedDishId = action.payload.dishId;
    },

    [dishesSlice.actions.unselect.type](state) {
      state.selectedDishId = null;
    },

    [clientsSlice.actions.setOk.type](state) {
      state.selectedDishId = null;
    },

    [clientsSlice.actions.setKo.type](state) {
      state.selectedDishId = null;
    },
  },
});

export default slice;
