import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Startpage.css';
import { TState, VisibleModalType } from '../../types';
import { startgame } from '../../actions';

const mapStateToProps =
  (state: TState) => ({
    isVisible:
      state.ui.modalType === VisibleModalType.STARTPAGE,
  });

const mapDispatchToProps = { startgame };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const startpageClass =
  (isVisible: boolean) =>
    classnames(
      'startpage',
      { 'startpage--visible': isVisible },
    );

const Startpage: FC<TProps> =
  ({ isVisible, startgame }) =>
    <div className={startpageClass(isVisible)}>
      <div className='startpage__body'>
        <div
          className='startpage__btn'
          onClick={startgame}></div>
      </div>
    </div>;

export default connector(Startpage);
