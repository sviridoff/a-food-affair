import { configureStore, combineReducers } from '@reduxjs/toolkit';

import clientsReducer from './reducers/clientsReducer';
import dishesReducer from './reducers/dishesReducer';
import tablesReducer from './reducers/tablesReducer';
import ingredientsReducer from './reducers/ingredientsReducer';
import uiReducer from './reducers/uiReducer';
import thunk from 'redux-thunk';

export const reducer = combineReducers({
  clients: clientsReducer,
  dishes: dishesReducer,
  tables: tablesReducer,
  ingredients: ingredientsReducer,
  ui: uiReducer,
});

export default configureStore({
  reducer,
  middleware: [thunk],
});
