import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './dish.css';
import { TDish, TState, TIngredient } from '../../types';
import { selectDish, makeSelectIngredients } from '../../selectors';
import { actions } from '../../reducers/dishesReducer';

type TOwnProps = {
  isLast: boolean,
  dishId: string,
};

const makeMapStateToProps = () => {
  const selectIngredients = makeSelectIngredients();

  return (state: TState, ownProps: TOwnProps) => ({
    dish: selectDish(state, ownProps.dishId),
    ingredients: selectIngredients(state, ownProps.dishId),
  });
};

const mapDispatchToProps = ({
  selectDish: actions.selectDish,
});

const connector = connect(makeMapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const ingredientsList = (ingredients: TIngredient[]) =>
  ingredients.map(ingredient =>
    <div className='dish__ingredient' key={ingredient.id}></div>);

const dishClass = (dish: TDish, isLast: boolean) =>
  classnames(
    'dish',
    {
      'dish--last': isLast,
      'dish--selected': dish.isSelected,
    }
  );

const Dish: FunctionComponent<TProps> =
  ({ dish, isLast, selectDish, ingredients }) =>
    <div
      className={dishClass(dish, isLast)}
      onClick={() => selectDish({ dish })}>
      {ingredientsList(ingredients)}
    </div>

export default connector(Dish);
