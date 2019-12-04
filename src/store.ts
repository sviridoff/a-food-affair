import { configureStore, combineReducers } from '@reduxjs/toolkit';

import clientsReducer from './reducers/clientsReducer';
import dishesReducer from './reducers/dishesReducer';
import tablesReducer from './reducers/tablesReducer';
import ingredientsReducer from './reducers/ingredientsReducer';

export const reducer = combineReducers({
  clients: clientsReducer,
  dishes: dishesReducer,
  tables: tablesReducer,
  ingredients: ingredientsReducer,
});

export default configureStore({ reducer });
