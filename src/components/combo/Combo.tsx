import React, { FC, useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './Combo.css';
import { TState } from '../../types';
import { comboEffect } from '../../libs/btnEffect';

const mapStateToProps =
  (state: TState) => ({
    combo: state.game.combo,
  });

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

const comboTxt = (combo: number) => {
  if (combo <= 2) {
    return 'Bad';
  } else if (combo <= 4) {
    return 'Good'
  } else if (combo <= 6) {
    return 'Great'
  } else {
    return 'Excellent';
  }
}

const Combo: FC<TProps> =
  ({ combo }) => {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!el.current) {
        return;
      }

      if (combo === 0) {
        return;
      }

      comboEffect(el.current);
    }, [combo]);

    return <div
      className={`combo combo--${comboTxt(combo).toLowerCase()}`}
      ref={el}>
      <div className='combo__title'>{comboTxt(combo)}</div>
      {
        combo > 2
          ? <div className='combo__count'>{combo - 2}</div>
          : null
      }
    </div>
  };

export default connector(Combo);
