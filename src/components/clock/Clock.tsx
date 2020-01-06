import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './Clock.css';
import { TState } from '../../types';

type TOwnProps = {
  createdAt: number,
  liveTime: number,
  isWaiting: boolean,
};

const mapStateToProps =
  (state: TState) => ({
    currentTime: state.timer.currentTime,
  });

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const getStyle = (
  liveTime: number,
  createdAt: number,
  currentTime: number,
  isWaiting: boolean,
) => {
  const perc = isWaiting
    ? (currentTime - createdAt) * 100 / (liveTime - createdAt)
    : 100;

  return {
    strokeDasharray: `${perc} 100`,
  };
};

const Clock: FC<TProps> =
  ({ createdAt, liveTime, currentTime, isWaiting }) =>
    <svg
      className='clock'
      viewBox='0 0 64 64'
      transform='rotate(-90)'>
      <circle
        r='25%'
        cx='50%'
        cy='50%'
        style={getStyle(liveTime, createdAt, currentTime, isWaiting)}>
      </circle>
    </svg>;

export default connector(Clock);
