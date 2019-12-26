import React, { FC } from 'react';

import './Board.css';
import LogoSvg from './LogoSvg.svg';
import Profile from '../profile/Profile';
import Diner from '../diner/Diner';
import Kitchen from '../kitchen/Kitchen';
import PauseBtn from '../pauseBtn/PauseBtn';

const Board: FC =
  () =>
    <div className='board'>
      <Profile />
      <div className='board__body-container'>
        <div className='board__game-logo'>
          <img src={LogoSvg} width='100%' height='100%' alt='' />
        </div>
        <Diner />
        <div className='board__menu-controls'>
          <div className='board__sound-btn'></div>
          <PauseBtn />
          <div className='board__replay-btn'></div>
        </div>
      </div>
      <Kitchen />
    </div>;

export default Board;
