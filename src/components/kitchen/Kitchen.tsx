import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './kitchen.css';
import { TState } from '../../types';
import { selectDishesIds } from '../../selectors';
import Dish from '../dish/Dish';

const mapStateToProps = (state: TState) => ({
  dishesIds: selectDishesIds(state),
});

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

const dishesList = (dishesIds: string[]) =>
  dishesIds.map((dishId, index) =>
      <Dish
        isLast={dishesIds.length === index + 1}
        dishId={dishId}
        key={dishId} />);

const Kitchen: FunctionComponent<TProps> =
  ({ dishesIds }) =>
    <div className='kitchen'>
      <div className='kitchen__trash-btn'></div>
      {dishesList(dishesIds)}
    </div>;

export default connector(Kitchen);
