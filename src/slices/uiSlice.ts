import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUi, VisibleModalType } from '../types';

const initialState: TUi = {
  modalType: VisibleModalType.RESTARTPAGE,
  selectedRecipe: null,
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

      return state;
    },

    selectRecipe(state, action: PayloadAction<TSelectRecipeProp>) {
      state.selectedRecipe = action.payload.recipeId;
    },

    selectDish(state, action: PayloadAction<TSelectDishProp>) {
      state.selectedDish = action.payload.dishId;
    }
  }
});

export default slice;
