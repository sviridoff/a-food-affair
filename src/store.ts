import { configureStore, combineReducers } from '@reduxjs/toolkit';

import clientsReducer from './reducers/clientsReducer';
import dishesReducer from './reducers/dishesReducer';
import tablesReducer from './reducers/tablesReducer';

export const reducer = combineReducers({
  clients: clientsReducer,
  dishes: dishesReducer,
  tables: tablesReducer,
});

export default configureStore({ reducer });
