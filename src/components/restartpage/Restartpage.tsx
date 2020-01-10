import React, { FC, useState, useEffect, memo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Restartpage.css';
import { TState, VisibleModalType, TLevel, GameStatus } from '../../types';
import { startgameLavel, togglePausegame } from '../../actions';
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
    isEndgame: state.game.status === GameStatus.WIN_STOP,
    levelsNum: Object.keys(state.levels.data).length,
    levels: state.levels.data,
    coins: state.profile.coins,
  });

const mapDispatchToProps = { startgameLavel, togglePausegame };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const startpageClass =
  (isVisible: boolean) =>
    classnames(
      'restartpage',
      { 'restartpage--visible': isVisible },
    );

const PrevLevelBtn: FC<{
  setLocalLevelId: (arg0: number) => void,
  localLevelId: number,
}> = memo(({
  setLocalLevelId,
  localLevelId,
}) => {
  const onClick = () => setLocalLevelId(localLevelId - 1);
  const onClickAttr = localLevelId > 1
    ? { onClick: btnEffect(onClick) }
    : {};

  return <div
    className='restartpage__prev-level-btn'
    {...onClickAttr}></div>;
});

const NextLevelBtn: FC<{
  setLocalLevelId: (arg0: number) => void,
  localLevelId: number,
  levelsNum: number,
}> = memo(({
  setLocalLevelId,
  localLevelId,
  levelsNum,
}) => {
  const onClick = () => setLocalLevelId(localLevelId + 1);
  const onClickAttr = localLevelId < levelsNum
    ? { onClick: btnEffect(onClick) }
    : {};

  return <div
    className='restartpage__next-level-btn'
    {...onClickAttr}></div>;
});

const playBtnClass = (
  currentLevelId: number,
  localLevelId: number,
  isStart: boolean,
) =>
  classnames({
    'restartpage__play-btn': currentLevelId !== localLevelId || isStart,
    'restartpage__retry-btn': currentLevelId === localLevelId || !isStart,
  });

const PlayBtn: FC<{
  currentLevelId: number,
  localLevelId: number,
  levels: TLevelsData,
  isStart: boolean,
  startgameLavel: (arg: number) => void,
}> = memo(({
  currentLevelId,
  localLevelId,
  levels,
  isStart,
  startgameLavel,
}) => {
  const onClick = () => startgameLavel(localLevelId);

  return !levels[localLevelId].isLock
    ? <div
      className={playBtnClass(currentLevelId, localLevelId, isStart)}
      onClick={btnEffect(onClick)}></div>
    : null;
});

const LevelTxt: FC<{
  levels: TLevelsData,
  localLevelId: number,
}> = memo(({
  levels,
  localLevelId,
}) =>
  <div className='restartpage__level'>
    {levels[localLevelId].isLock ? '?' : localLevelId}
  </div>);

const ResumeBtn: FC<{
  isPaused: boolean,
  currentLevelId: number,
  localLevelId: number,
  togglePausegame: () => void,
}> = memo(({
  isPaused,
  currentLevelId,
  localLevelId,
  togglePausegame,
}) =>
  isPaused && currentLevelId === localLevelId
    ? <div
      className='restartpage__resume-btn'
      onClick={btnEffect(togglePausegame)}></div>
    : null);

const LogoGame: FC<{ isFirst: boolean }> = memo(({ isFirst }) =>
  isFirst
    ? <img
      className='restartpage__game-logo'
      src={LogoSvg}
      alt='' />
    : null);

const Coins: FC<{
  coins: number, isEndgame: boolean
}> = memo(({ coins, isEndgame }) =>
  isEndgame
    ? <div className='restartpage__coins'>
      <div className='restartpage__coins__logo'></div>
      <div className='restartpage__coins__txt'>{coins}</div>
    </div>
    : null);

const Startpage: FC<TProps> =
  ({
    isVisible,
    currentLevelId,
    levelsNum,
    levels,
    startgameLavel,
    togglePausegame,
    isPaused,
    isFirst,
    isStart,
    isEndgame,
    coins,
  }) => {
    const [localLevelId, setLocalLevelId]
      = useState(currentLevelId);

    useEffect(() => {
      setLocalLevelId(currentLevelId);
    }, [currentLevelId]);

    return <div className={startpageClass(isVisible)}>
      <LogoGame isFirst={isFirst} />
      <Coins
        coins={coins}
        isEndgame={isEndgame} />
      <div className='restartpage__level-ctrl'>
        <PrevLevelBtn
          setLocalLevelId={setLocalLevelId}
          localLevelId={localLevelId} />
        <LevelTxt
          levels={levels}
          localLevelId={localLevelId} />
        <NextLevelBtn
          setLocalLevelId={setLocalLevelId}
          localLevelId={localLevelId}
          levelsNum={levelsNum} />
      </div>
      <div className='restartpage__level-start'>
        <PlayBtn
          currentLevelId={currentLevelId}
          localLevelId={localLevelId}
          levels={levels}
          isStart={isStart}
          startgameLavel={startgameLavel} />
        <ResumeBtn
          isPaused={isPaused}
          currentLevelId={currentLevelId}
          localLevelId={localLevelId}
          togglePausegame={togglePausegame} />
      </div>
    </div>;
  };

export default connector(Startpage);
