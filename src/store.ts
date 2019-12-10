import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import clientsReducer from './reducers/clientsReducer';
import dishesReducer from './reducers/dishesReducer';
import tablesReducer from './reducers/tablesReducer';
import ingredientsReducer from './reducers/ingredientsReducer';
import uiReducer from './reducers/uiReducer';
import recipesReducer from './reducers/recipesReducer';
import profileReducer from './reducers/profileReducer';
import levelsReducer from './reducers/levelsReducer';

export const reducer = combineReducers({
  clients: clientsReducer,
  dishes: dishesReducer,
  tables: tablesReducer,
  ingredients: ingredientsReducer,
  ui: uiReducer,
  recipes: recipesReducer,
  profile: profileReducer,
  levels: levelsReducer,
});

export default configureStore({
  reducer,
  middleware: [thunk],
});
