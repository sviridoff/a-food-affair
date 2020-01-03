import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Restartpage.css';
import { TState, VisibleModalType, TLevel, GameStatus } from '../../types';
import { startgameLavel, resumePauseGame } from '../../actions';
import LogoSvg from '../logoSvg/LogoSvg.svg';
import btnEffect from '../../libs/btnEffect';

type TLevelsData = { [key: string]: TLevel };

const mapStateToProps =
  (state: TState) => ({
    currentLevel: state.profile.level,
    isVisible: state.ui.modalType === VisibleModalType.RESTARTPAGE,
    isPaused: state.game.status === GameStatus.PAUSE,
    isFirst: state.game.status === GameStatus.FIRST_STOP,
    isStart: state.game.status === GameStatus.WIN_STOP
      || state.game.status === GameStatus.FIRST_STOP,
    levelsNum: Object.keys(state.levels.data).length,
    levels: state.levels.data,
  });

const mapDispatchToProps = { startgameLavel, resumePauseGame };

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
  const onClick = () => setLocalLevel(localLevel - 1);
  const onClickAttr = localLevel > 1
    ? { onClick: (ev: SyntheticEvent) => btnEffect(onClick, ev.target) }
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
  const onClick = () => setLocalLevel(localLevel + 1);
  const onClickAttr = localLevel < levelsNum
    ? { onClick: (ev: SyntheticEvent) => btnEffect(onClick, ev.target) }
    : {};

  return <div
    className='restartpage__next-level-btn'
    {...onClickAttr}></div>;
};

const playBtnClass = (
  currentLevel: number,
  localLevel: number,
  isStart: boolean,
) =>
  classnames({
    'restartpage__play-btn': currentLevel !== localLevel || isStart,
    'restartpage__retry-btn': currentLevel === localLevel || !isStart,
  });

const playBtnEl = (
  currentLevel: number,
  localLevel: number,
  levels: TLevelsData,
  isStart: boolean,
  startgameLavel: (arg: number) => void,
) => {
  const onClick = () => startgameLavel(localLevel);

  return !levels[localLevel].isLock
    ? <div
      className={playBtnClass(currentLevel, localLevel, isStart)}
      onClick={(ev: SyntheticEvent) => btnEffect(onClick, ev.target)}></div>
    : null;
}

const levelTxtEl = (
  levels: TLevelsData,
  localLevel: number,
) =>
  <div className='restartpage__level'>
    {levels[localLevel].isLock ? '?' : localLevel}
  </div>;

const resumeBtnEl = (
  isPaused: boolean,
  level: number,
  localLevel: number,
  resumePauseGame: () => void,
) =>
  isPaused && level === localLevel
    ? <div
      className='restartpage__resume-btn'
      onClick={(ev: SyntheticEvent) => btnEffect(resumePauseGame, ev.target)}></div>
    : null;

const logoGameEl = (isFirst: boolean) =>
  isFirst
    ? <img
      className='restartpage__game-logo'
      src={LogoSvg}
      alt='' />
    : null;

const Startpage: FC<TProps> =
  ({
    isVisible,
    currentLevel,
    levelsNum,
    levels,
    startgameLavel,
    resumePauseGame,
    isPaused,
    isFirst,
    isStart,
  }) => {
    const [localLevel, setLocalLevel]
      = useState(currentLevel);

    useEffect(() => {
      setLocalLevel(currentLevel);
    }, [currentLevel]);

    return <div className={startpageClass(isVisible)}>
      {logoGameEl(isFirst)}
      <div className='restartpage__level-ctrl'>
        {prevLevelBtnEl(setLocalLevel, localLevel)}
        {levelTxtEl(levels, localLevel)}
        {nextLevelBtnEl(setLocalLevel, localLevel, levelsNum)}
      </div>
      <div className='restartpage__level-start'>
        {playBtnEl(currentLevel, localLevel, levels, isStart, startgameLavel)}
        {resumeBtnEl(isPaused, currentLevel, localLevel, resumePauseGame)}
      </div>
    </div>;
  };

export default connector(Startpage);
