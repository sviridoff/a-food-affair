import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import clientsSlice from './slices/clientsSlice';
import dishesSlice from './slices/dishesSlice';
import tablesSlice from './slices/tablesSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import uiSlice from './slices/uiSlice';
import recipesSlice from './slices/recipesSlice';
import profileSlice from './slices/profileSlice';
import levelsSlice from './slices/levelsSlice';
import gameSlice from './slices/gameSlice';

export const reducer = combineReducers({
  clients: clientsSlice.reducer,
  dishes: dishesSlice.reducer,
  tables: tablesSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  ui: uiSlice.reducer,
  recipes: recipesSlice.reducer,
  profile: profileSlice.reducer,
  levels: levelsSlice.reducer,
  game: gameSlice.reducer,
});

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware(),
});
