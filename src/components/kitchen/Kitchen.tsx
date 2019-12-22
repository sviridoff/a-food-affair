import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './Kitchen.css';
import { TState } from '../../types';
import { selectDishesIds } from '../../selectors';
import { clearDish } from '../../actions';
import Dish from '../dish/Dish';

const mapStateToProps = (state: TState) => ({
  dishesIds: selectDishesIds(state),
});

const mapDispatchToProps = { clearDish };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const dishesList = (dishesIds: string[]) =>
  dishesIds.map((dishId, index) =>
    <Dish
      isLast={dishesIds.length === index + 1}
      dishId={dishId}
      key={dishId} />);

const Kitchen: FC<TProps> =
  ({ dishesIds, clearDish }) =>
    <div className='kitchen'>
      <div
        className='kitchen__trash-btn'
        onClick={clearDish}></div>
      {dishesList(dishesIds)}
    </div>;

export default connector(Kitchen);
