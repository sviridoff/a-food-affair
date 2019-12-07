import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './reset.css';
import './index.css';
import { ReactComponent as LogoSvg } from './LogoSvg.svg';
import store from './store';
import Kitchen from './components/kitchen/Kitchen';
import Diner from './components/diner/Diner';
import IngredientsStore from './components/ingredientsStore/IngredientsStore';
import Profile from './components/profile/Profile';
import Recipes from './components/recipes/Recipes';

const App = () =>
  <>
    <Recipes />
    <IngredientsStore />
    <div className='gameplay-container'>
      <Profile />
      <div className='body-container'>
        <div className='game-logo'>
          <LogoSvg width='100%' height='100%' />
        </div>
        <Diner />
        <div className='menu-controls'>
          <div className='sound-btn'></div>
          <div className='pause-btn'></div>
          <div className='replay-btn'></div>
        </div>
      </div>
      <Kitchen />
    </div>
  </>;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
