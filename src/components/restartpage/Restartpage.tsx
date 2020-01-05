import React, { FC, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Restartpage.css';
import { TState, VisibleModalType, TLevel, GameStatus } from '../../types';
import { startgameLavel, resumePauseGame } from '../../actions';
import LogoSvg from '../logoSvg/LogoSvg.svg';
import { btnEffect } from '../../libs/btnEffect';

type TLevelsData = { [key: string]: TLevel };

const mapStateToProps =
  (state: TState) => ({
    currentLevelId: state.profile.levelId,
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
  setLocalLevelId: (arg0: number) => void,
  localLevelId: number,
) => {
  const onClick = () => setLocalLevelId(localLevelId - 1);
  const onClickAttr = localLevelId > 1
    ? { onClick: btnEffect(onClick) }
    : {};

  return <div
    className='restartpage__prev-level-btn'
    {...onClickAttr}></div>;
}

const nextLevelBtnEl = (
  setLocalLevelId: (arg0: number) => void,
  localLevelId: number,
  levelsNum: number,
) => {
  const onClick = () => setLocalLevelId(localLevelId + 1);
  const onClickAttr = localLevelId < levelsNum
    ? { onClick: btnEffect(onClick) }
    : {};

  return <div
    className='restartpage__next-level-btn'
    {...onClickAttr}></div>;
};

const playBtnClass = (
  currentLevelId: number,
  localLevelId: number,
  isStart: boolean,
) =>
  classnames({
    'restartpage__play-btn': currentLevelId !== localLevelId || isStart,
    'restartpage__retry-btn': currentLevelId === localLevelId || !isStart,
  });

const playBtnEl = (
  currentLevelId: number,
  localLevelId: number,
  levels: TLevelsData,
  isStart: boolean,
  startgameLavel: (arg: number) => void,
) => {
  const onClick = () => startgameLavel(localLevelId);

  return !levels[localLevelId].isLock
    ? <div
      className={playBtnClass(currentLevelId, localLevelId, isStart)}
      onClick={btnEffect(onClick)}></div>
    : null;
}

const levelTxtEl = (
  levels: TLevelsData,
  localLevelId: number,
) =>
  <div className='restartpage__level'>
    {levels[localLevelId].isLock ? '?' : localLevelId}
  </div>;

const resumeBtnEl = (
  isPaused: boolean,
  currentLevelId: number,
  localLevelId: number,
  resumePauseGame: () => void,
) =>
  isPaused && currentLevelId === localLevelId
    ? <div
      className='restartpage__resume-btn'
      onClick={btnEffect(resumePauseGame)}></div>
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
    currentLevelId,
    levelsNum,
    levels,
    startgameLavel,
    resumePauseGame,
    isPaused,
    isFirst,
    isStart,
  }) => {
    const [localLevelId, setLocalLevelId]
      = useState(currentLevelId);

    useEffect(() => {
      setLocalLevelId(currentLevelId);
    }, [currentLevelId]);

    return <div className={startpageClass(isVisible)}>
      {logoGameEl(isFirst)}
      <div className='restartpage__level-ctrl'>
        {prevLevelBtnEl(setLocalLevelId, localLevelId)}
        {levelTxtEl(levels, localLevelId)}
        {nextLevelBtnEl(setLocalLevelId, localLevelId, levelsNum)}
      </div>
      <div className='restartpage__level-start'>
        {playBtnEl(currentLevelId, localLevelId, levels, isStart, startgameLavel)}
        {resumeBtnEl(isPaused, currentLevelId, localLevelId, resumePauseGame)}
      </div>
    </div>;
  };

export default connector(Startpage);
