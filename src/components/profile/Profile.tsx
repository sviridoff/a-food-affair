import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './profile.css';
import { TState } from '../../types';

const mapStateToProps = (state: TState) => ({
  lives: state.profile.lives,
});

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

const Profile: FC<TProps> =
  ({ lives }) =>
    <div className='profile'>
      <div className='profile__lives'>
        <div className='profile__lives__logo'></div>
        x {lives}
      </div>
    </div>;

export default connector(Profile);
