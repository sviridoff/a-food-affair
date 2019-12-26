import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './Profile.css';
import { TState } from '../../types';

const mapStateToProps = (state: TState) => ({
  lives: state.profile.lives,
  coins: state.profile.coins,
  level: state.profile.level,
});

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

const Profile: FC<TProps> =
  ({ lives, coins, level }) =>
    <div className='profile'>
      <div className='profile__level'>
        Lv {level}
      </div>
      <div className='profile__lives'>
        <div className='profile__lives__logo'></div>
        x {lives}
      </div>
      <div className='profile__coins'>
        <div className='profile__coins__logo'></div>
        {coins}
      </div>
    </div>;

export default connector(Profile);
