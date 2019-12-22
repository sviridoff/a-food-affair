import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Restartpage.css';
import { TState, VisibleModalType } from '../../types';
import { startgame } from '../../actions';

const mapStateToProps =
  (state: TState) => ({
    isVisible:
      state.ui.modalType === VisibleModalType.RESTARTPAGE,
  });

const mapDispatchToProps = { startgame };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const startpageClass =
  (isVisible: boolean) =>
    classnames(
      'restartpage',
      { 'restartpage--visible': isVisible },
    );

const Startpage: FC<TProps> =
  ({ isVisible, startgame }) =>
    <div className={startpageClass(isVisible)}>
      <div className='restartpage__body'>
        <div
          className='restartpage__btn'
          onClick={startgame}></div>
      </div>
    </div>;

export default connector(Startpage);
