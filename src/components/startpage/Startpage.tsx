import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './startpage.css';
import { TState } from '../../types';
import { startgame } from '../../actions';

const mapStateToProps = (state: TState) => ({
  isStartpageVisible: state.ui.isStartpageVisible,
});

const mapDispatchToProps = { startgame };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const startpageClass =
  (isStartpageVisible: boolean) =>
    classnames(
      'startpage',
      { 'startpage--visible': isStartpageVisible },
    );

const Startpage: FC<TProps> =
  ({ isStartpageVisible, startgame }) =>
    <div className={startpageClass(isStartpageVisible)}>
      <div className='startpage__body'>
        <div
          className='startpage__btn'
          onClick={startgame}></div>
      </div>
    </div>;

export default connector(Startpage);
