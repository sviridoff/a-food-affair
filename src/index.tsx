import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { ReactComponent as LogoSvg } from './LogoSvg.svg';
import store from './store';

function App() {
  return (
    <div className='gameplay-container'>
      <div className='user-stats-section'>
        <div className='user-lives'>
          <div className='user-lives_logo'></div>
          x 8
        </div>
      </div>
      <div className='body-container'>
        <div className='game-logo'>
          <LogoSvg width='100%' height='100%' />
        </div>
        <div className='diner-section'>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section'>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn'></div>
            <div className='client-btn client-btn--last'></div>
          </div>
          <div className='table-section table-section--last'>
            <div className='client-btn'>
              <div className='client-clock'></div>
            </div>
            <div className='client-btn'>
              <div className='client-clock'></div>
            </div>
            <div className='client-btn client-btn--last'>
              <div className='client-clock'></div>
            </div>
          </div>
        </div>
        <div className='menu-controls'>
          <div className='sound-btn'></div>
          <div className='pause-btn'></div>
          <div className='replay-btn'></div>
        </div>
      </div>
      <div className='kitchen-section'>
        <div className='trash-btn'></div>
        <div className='dish-btn'>
          <div className='dish-food'></div>
          <div className='dish-food'></div>
          <div className='dish-food'></div>
        </div>
        <div className='dish-btn'>
          <div className='dish-food'></div>
          <div className='dish-food'></div>
          <div className='dish-food'></div>
          <div className='dish-food'></div>
        </div>
        <div className='dish-btn dish-btn--last'></div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
