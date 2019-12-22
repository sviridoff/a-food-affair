import React, { FC } from 'react';
import gameSlice from '../../slices/gameSlice';

import './PauseBtn.css';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';
import { TState, GameStatus } from '../../types';

const mapStateToProps = (state: TState) => ({
  isSelected: state.game.status === GameStatus.PAUSE,
});

const mapDispatchToProps = {
  toggleStatus: gameSlice.actions.toggleStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const pauseBtnClass = (isSelected: boolean) =>
  classnames(
    'pause-btn',
    { 'pause-btn--is-selected': isSelected },
  );

const PauseBtn: FC<TProps> = ({ toggleStatus, isSelected }) =>
  <div
    className={pauseBtnClass(isSelected)}
    onClick={() => toggleStatus()}></div>;

export default connector(PauseBtn);
