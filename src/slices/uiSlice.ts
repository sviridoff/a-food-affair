import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUi, VisibleModalType } from '../types';
import gameSlice, {
  TStartgameProps,
  TToggleResumegameProps,
} from './gameSlice';
import dishesSlice, { TSelectProps } from './dishesSlice';

const initialState: TUi = {
  modalType: VisibleModalType.RESTARTPAGE,
  selectedRecipe: 'donut-oreo',
  selectedDishId: null,
};

type TSelectVisibleModalType = {
  modalType: VisibleModalType,
};

type TSelectRecipeProp = {
  recipeId: string | null,
};

type TSelectDishProp = {
  dishId: string | null,
};

type TShowIngredientsStoreProps = {
  dishId: string,
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

    selectRecipe(state, action: PayloadAction<TSelectRecipeProp>) {
      state.selectedRecipe = action.payload.recipeId;
    },

    selectDish(state, action: PayloadAction<TSelectDishProp>) {
      state.selectedDishId = action.payload.dishId;
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
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      _,
      action: PayloadAction<TStartgameProps>,
    ): TUi {
      return {
        selectedDishId: null,
        selectedRecipe: initialState.selectedRecipe,
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
  },
});

export default slice;
