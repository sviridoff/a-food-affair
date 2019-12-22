import React, { FC } from 'react';
import classnames from 'classnames';

import './Board.css';
import { ReactComponent as LogoSvg } from './LogoSvg.svg';
import Profile from '../profile/Profile';
import Diner from '../diner/Diner';
import Kitchen from '../kitchen/Kitchen';
import { connect, ConnectedProps } from 'react-redux';
import { TState, VisibleModalType } from '../../types';
import gameSlice from '../../slices/gameSlice';

const mapStateToProps =
  (state: TState) => ({
    isFaded: state.ui.modalType !== VisibleModalType.NONE,
  });

const mapDispatchToProps = {
  toggleStatus: gameSlice.actions.toggleStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const boardClass = (isFaded: boolean) =>
  classnames(
    'board',
    { 'board--fade': isFaded },
  );

const Board: FC<TProps> =
  ({ isFaded, toggleStatus }) =>
    <div className={boardClass(isFaded)}>
      <Profile />
      <div className='board__body-container'>
        <div className='board__game-logo'>
          <LogoSvg width='100%' height='100%' />
        </div>
        <Diner />
        <div className='board__menu-controls'>
          <div className='board__sound-btn'></div>
          <div
            className='board__pause-btn'
            onClick={() => toggleStatus}></div>
          <div className='board__replay-btn'></div>
        </div>
      </div>
      <Kitchen />
    </div>;

export default connector(Board);
