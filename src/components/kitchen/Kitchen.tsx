import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './kitchen.css';
import { TState } from '../../types';
import { selectDishesIds } from '../../selectors';
import { actions as dishesActions } from '../../reducers/dishesReducer';
import Dish from '../dish/Dish';

const mapStateToProps = (state: TState) => ({
  dishesIds: selectDishesIds(state),
});

const mapDispatchToProps = {
  resetSelected: dishesActions.resetSelected,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const dishesList = (dishesIds: string[]) =>
  dishesIds.map((dishId, index) =>
    <Dish
      isLast={dishesIds.length === index + 1}
      dishId={dishId}
      key={dishId} />);

const Kitchen: FC<TProps> =
  ({ dishesIds, resetSelected }) =>
    <div className='kitchen'>
      <div
        className='kitchen__trash-btn'
        onClick={resetSelected}></div>
      {dishesList(dishesIds)}
    </div>;

export default connector(Kitchen);
