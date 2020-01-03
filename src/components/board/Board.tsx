import React, { FC } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import './Board.css';
import LogoSvg from '../logoSvg/LogoSvg.svg';
import Profile from '../profile/Profile';
import Diner from '../diner/Diner';
import Kitchen from '../kitchen/Kitchen';
import { resumePauseGame } from '../../actions';
import { btnEffect } from '../../libs/btnEffect';

const mapDispatchToProps = { resumePauseGame };

const connector = connect(null, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const Board: FC<TProps> =
  ({ resumePauseGame }) =>
    <div className='board'>
      <Profile />
      <div className='board__body-container'>
        <img
          className='board__game-logo'
          src={LogoSvg}
          alt='' />
        <Diner />
        <div className='board__menu-ctrls'>
          <div
            className='board__pause-btn'
            onClick={btnEffect(resumePauseGame)}></div>
        </div>
      </div>
      <Kitchen />
    </div>;

export default connector(Board);
