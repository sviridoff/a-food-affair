import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './reset.css';
import './variables.css';
import store from './store';
import IngredientsStore from './components/ingredientsStore/IngredientsStore';
import Recipes from './components/recipes/Recipes';
import Board from './components/board/Board';

ReactDOM.render(
  <Provider store={store}>
    <Recipes />
    <IngredientsStore />
    <Board />
  </Provider>,
  document.getElementById('root')
);
