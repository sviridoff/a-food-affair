import React, { FC } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import './Board.css';
import LogoSvg from './LogoSvg.svg';
import Profile from '../profile/Profile';
import Diner from '../diner/Diner';
import Kitchen from '../kitchen/Kitchen';
import { resumePauseGame } from '../../actions';

const mapDispatchToProps = { resumePauseGame };

const connector = connect(null, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const Board: FC<TProps> =
  ({ resumePauseGame }) =>
    <div className='board'>
      <Profile />
      <div className='board__body-container'>
        <div className='board__game-logo'>
          <img src={LogoSvg} width='100%' height='100%' alt='' />
        </div>
        <Diner />
        <div className='board__menu-controls'>
          <div
            className='board__pause-btn'
            onClick={resumePauseGame}></div>
        </div>
      </div>
      <Kitchen />
    </div>;

export default connector(Board);
