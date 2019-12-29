import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Restartpage.css';
import { TState, VisibleModalType, TLevel } from '../../types';
import { startgame, startgameLavel } from '../../actions';

type TLevelsData = { [key: string]: TLevel };

const mapStateToProps =
  (state: TState) => ({
    currentLevel: state.profile.level,
    isVisible:
      state.ui.modalType === VisibleModalType.RESTARTPAGE,
    levelsNum: Object.keys(state.levels.data).length,
    levels: state.levels.data,
  });

const mapDispatchToProps = { startgame, startgameLavel };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const startpageClass =
  (isVisible: boolean) =>
    classnames(
      'restartpage',
      { 'restartpage--visible': isVisible },
    );

const prevLevelBtn = (
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

const nextLevelBtn = (
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

const playBtn = (
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

const retryBtn = (
  level: number,
  localLevel: number,
  startgame: () => void,
) =>
  level === localLevel
    ? <div
      className='restartpage__retry-btn'
      onClick={startgame}></div>
    : null;

const levelTxt = (
  levels: TLevelsData,
  localLevel: number,
) =>
  <div className='restartpage__level'>
    {levels[localLevel].isLock ? '?' : localLevel}
  </div>;

const Startpage: FC<TProps> =
  ({
    isVisible,
    currentLevel,
    levelsNum,
    levels,
    startgame,
    startgameLavel,
  }) => {
    const [localLevel, setLocalLevel]
      = useState(currentLevel);

    return <div className={startpageClass(isVisible)}>
      <div className='restartpage__level-ctrl'>
        {prevLevelBtn(setLocalLevel, localLevel)}
        {levelTxt(levels, localLevel)}
        {nextLevelBtn(setLocalLevel, localLevel, levelsNum)}
      </div>
      <div className='restartpage__level-start'>
        {retryBtn(currentLevel, localLevel, startgame)}
        {playBtn(currentLevel, localLevel, levels, startgameLavel)}
      </div>
    </div>;
  };

export default connector(Startpage);
