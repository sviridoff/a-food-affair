import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Restartpage.css';
import { TState, VisibleModalType, TLevel, GameStatus } from '../../types';
import { startgame, startgameLavel, resumePauseGame } from '../../actions';

type TLevelsData = { [key: string]: TLevel };

const mapStateToProps =
  (state: TState) => ({
    currentLevel: state.profile.level,
    isVisible: state.ui.modalType === VisibleModalType.RESTARTPAGE,
    isPaused: state.game.status === GameStatus.PAUSE,
    levelsNum: Object.keys(state.levels.data).length,
    levels: state.levels.data,
  });

const mapDispatchToProps = { startgame, startgameLavel, resumePauseGame };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const startpageClass =
  (isVisible: boolean) =>
    classnames(
      'restartpage',
      { 'restartpage--visible': isVisible },
    );

const prevLevelBtnEl = (
  setLocalLevel: (arg0: number) => void,
  localLevel: number,
) => {
  const onClickAttr = localLevel > 1
    ? { onClick: () => setLocalLevel(localLevel - 1) }
    : {};

  return <div
    className='restartpage__prev-level-btn'
    {...onClickAttr}></div>;
}

const nextLevelBtnEl = (
  setLocalLevel: (arg0: number) => void,
  localLevel: number,
  levelsNum: number,
) => {
  const onClickAttr = localLevel < levelsNum
    ? { onClick: () => setLocalLevel(localLevel + 1) }
    : {};

  return <div
    className='restartpage__next-level-btn'
    {...onClickAttr}></div>;
};

const playBtnEl = (
  level: number,
  localLevel: number,
  levels: TLevelsData,
  startgameLavel: (arg: number) => void,
) =>
  level !== localLevel && !levels[localLevel].isLock
    ? <div
      className='restartpage__play-btn'
      onClick={() => startgameLavel(localLevel)}></div>
    : null;

const retryBtnEl = (
  level: number,
  localLevel: number,
  startgame: () => void,
) =>
  level === localLevel
    ? <div
      className='restartpage__retry-btn'
      onClick={startgame}></div>
    : null;

const levelTxtEl = (
  levels: TLevelsData,
  localLevel: number,
) =>
  <div className='restartpage__level'>
    {levels[localLevel].isLock ? '?' : localLevel}
  </div>;

const resumeBtnEl = (
  isPaused: boolean,
  resumePauseGame: () => void,
) =>
  isPaused
    ? <div
      className='restartpage__resume-btn'
      onClick={resumePauseGame}></div>
    : null;

const Startpage: FC<TProps> =
  ({
    isVisible,
    currentLevel,
    levelsNum,
    levels,
    startgame,
    startgameLavel,
    resumePauseGame,
    isPaused,
  }) => {
    const [localLevel, setLocalLevel]
      = useState(currentLevel);

    return <div className={startpageClass(isVisible)}>
      <div className='restartpage__level-ctrl'>
        {prevLevelBtnEl(setLocalLevel, localLevel)}
        {levelTxtEl(levels, localLevel)}
        {nextLevelBtnEl(setLocalLevel, localLevel, levelsNum)}
      </div>
      <div className='restartpage__level-start'>
        {retryBtnEl(currentLevel, localLevel, startgame)}
        {playBtnEl(currentLevel, localLevel, levels, startgameLavel)}
        {resumeBtnEl(isPaused, resumePauseGame)}
      </div>
    </div>;
  };

export default connector(Startpage);
