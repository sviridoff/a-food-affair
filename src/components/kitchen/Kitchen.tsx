import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './kitchen.css';
import { TState, TDish } from '../../store';
import { selectDishes } from '../../selectors';

const mapStateToProps = (state: TState) => ({
  dishes: selectDishes(state),
});

const connector = connect(mapStateToProps);

type TReduxProps = ConnectedProps<typeof connector>;
type TProps = TReduxProps & {};

const dishBtnClass = (dishes: TDish[], index: number) =>
  classnames(
    'kitchen__dish-btn',
    { 'kitchen__dish-btn--last': index + 1 === dishes.length }
  );

const dishesList = (dishes: TDish[]) =>
  dishes.map((dish, index) =>
    <div className={dishBtnClass(dishes, index)} key={dish.id}>
      <div className='kitchen__dish-food'></div>
      <div className='kitchen__dish-food'></div>
      <div className='kitchen__dish-food'></div>
    </div>);

const Kitchen: FunctionComponent<TProps> =
  ({ dishes }) =>
    <div className='kitchen'>
      <div className='kitchen__trash-btn'></div>
      {dishesList(dishes)}
    </div>;

export default connector(Kitchen);
