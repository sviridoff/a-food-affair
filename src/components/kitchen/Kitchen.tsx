import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './kitchen.css';
import { TState, TDish } from '../../types';
import { selectDishes } from '../../selectors';
import { selectDish, TSelectDish } from '../../reducers/dishesReducer';

const mapStateToProps = (state: TState) => ({
  dishes: selectDishes(state),
});

const connector = connect(mapStateToProps, { selectDish });

type TProps = ConnectedProps<typeof connector>;

const dishBtnClass = (dish: TDish, dishes: TDish[], index: number) =>
  classnames(
    'kitchen__dish-btn',
    {
      'kitchen__dish-btn--last': index + 1 === dishes.length,
      'kitchen__dish-btn--selected': dish.isSelected,
    }
  );

const dishesList = (dishes: TDish[], selectDish: TSelectDish) =>
  dishes.map((dish, index) =>
    <div
      className={dishBtnClass(dish, dishes, index)}
      onClick={() => selectDish({ dish })}
      key={dish.id}>
      <div className='kitchen__dish-food'></div>
      <div className='kitchen__dish-food'></div>
      <div className='kitchen__dish-food'></div>
    </div>);

const Kitchen: FunctionComponent<TProps> =
  ({ dishes, selectDish }) =>
    <div className='kitchen'>
      <div className='kitchen__trash-btn'></div>
      {dishesList(dishes, selectDish)}
    </div>;

export default connector(Kitchen);
