import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './dish.css';
import { TState, TIngredient } from '../../types';
import { selectDish, makeSelectIngredients } from '../../selectors';
import { showIngredientsStore } from '../../actions';

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

const mapDispatchToProps = {
  showIngredientsStore,
};

const connector = connect(makeMapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const ingredientsList = (ingredients: TIngredient[]) =>
  ingredients.map(ingredient =>
    <div className='dish__ingredient' key={ingredient.id}></div>);

const dishClass = (isSelected: boolean, isLast: boolean) =>
  classnames(
    'dish',
    {
      'dish--last': isLast,
      'dish--selected': isSelected,
    }
  );

const Dish: FunctionComponent<TProps> =
  ({
    dish,
    dishId,
    isLast,
    ingredients,
    showIngredientsStore
  }) => {
    const onClick = () => showIngredientsStore();

    return (
      <div
        className={dishClass(dish.isSelected, isLast)}
        onClick={onClick}>
        {ingredientsList(ingredients)}
      </div>
    );
  };

export default connector(Dish);
