import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './reset.css';
import './variables.css';
import store from './store';
import IngredientsStore from './components/ingredientsStore/IngredientsStore';
import Recipes from './components/recipes/Recipes';
import Board from './components/board/Board';
import Restartpage from './components/restartpage/Restartpage';

ReactDOM.render(
  <Provider store={store}>
    <Restartpage />
    <Recipes />
    <IngredientsStore />
    <Board />
  </Provider>,
  document.getElementById('root')
);
