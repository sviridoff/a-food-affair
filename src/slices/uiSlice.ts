import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUi, VisibleModalType } from '../types';
import gameSlice, {
  TStartgameProps,
  TToggleResumegameProps,
} from './gameSlice';
import dishesSlice from './dishesSlice';

const initialState: TUi = {
  modalType: VisibleModalType.RESTARTPAGE,
  selectedRecipe: 'donut-oreo',
  selectedDish: null,
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
      state.selectedDish = action.payload.dishId;
    },

    closeIngredientsStore(state) {
      state.selectedDish = null;
      state.modalType = VisibleModalType.NONE;
    },
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      state,
      action: PayloadAction<TStartgameProps>,
    ): TUi {
      return {
        selectedDish: null,
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
      state.selectedDish = null;
    },

    [dishesSlice.actions.addIngredient.type](state) {
      state.selectedDish = null;
      state.modalType = VisibleModalType.NONE;
    },
  },
});

export default slice;
