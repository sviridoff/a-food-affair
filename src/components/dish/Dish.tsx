import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './dish.css';
import { TDish, TState } from '../../types';
import { selectDish } from '../../selectors';
import { actions } from '../../reducers/dishesReducer';

type TOwnProps = {
  isLast: boolean,
  dishId: string,
};

const mapStateToProps = (state: TState, ownProps: TOwnProps) => ({
  dish: selectDish(state, ownProps.dishId),
});

const mapDispatchToProps = ({
  selectDish: actions.selectDish,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const dishBtnClass = (dish: TDish, isLast: boolean) =>
  classnames(
    'dish',
    {
      'dish--last': isLast,
      'dish--selected': dish.isSelected,
    }
  );

const Dish: FunctionComponent<TProps> =
  ({ dish, isLast, selectDish }) =>
    <div
      className={dishBtnClass(dish, isLast)}
      onClick={() => selectDish({ dish })}>
      <div className='dish__food'></div>
      <div className='dish__food'></div>
      <div className='dish__food'></div>
    </div>

export default connector(Dish);
