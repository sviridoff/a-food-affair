import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Dish.css';
import '../../ingredient.css';
import '../../recipe.css';
import { TState, TIngredient } from '../../types';
import {
  selectDish,
  makeSelectIngredients,
  makeSelectRecipeId,
} from '../../selectors';
import { chooseDish } from '../../actions';

const maxIngredientsPerDish = 4;

type TOwnProps = {
  dishId: string,
};

const makeMapStateToProps = () => {
  const selectIngredients = makeSelectIngredients();
  const selectRecipeId = makeSelectRecipeId();

  return (state: TState, ownProps: TOwnProps) => ({
    dish: selectDish(state, ownProps.dishId),
    ingredients: selectIngredients(state, ownProps.dishId),
    recipeId: selectRecipeId(state, ownProps.dishId),
  });
};

const mapDispatchToProps = { chooseDish };

const connector = connect(makeMapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const ingredientClass = (length: number, ingredientId: string) =>
  classnames(
    'dish__ingredient',
    `ingredient__${ingredientId}`,
    {
      'dish__ingredient--main': length === 1,
    }
  );

const ingredientsList =
  (ingredients: TIngredient[]) =>
    ingredients
      .slice(0, ingredients.length <= maxIngredientsPerDish ? ingredients.length : 3)
      .map((ingredient, index) =>
        <div
          className={ingredientClass(ingredients.length, ingredient.id)}
          key={`${ingredient.id}-${index}`}></div>);

const dishClass = (isSelected: boolean) =>
  classnames(
    'dish',
    { 'dish--is-selected': isSelected }
  );

const ingredientsEl = (
  ingredients: TIngredient[],
  maxIngredientsPerDish: number,
) =>
  <>
    {ingredientsList(ingredients)}
    {ingredients.length > maxIngredientsPerDish &&
      <div className='dish__ellipsis'>...</div>}
  </>;

const Dish: FC<TProps> =
  ({
    dish,
    dishId,
    ingredients,
    chooseDish,
    recipeId,
  }) =>
    <div
      className={dishClass(dish.isSelected)}
      onClick={(event) => chooseDish(dishId, event)}>
      {
        recipeId
          ? <div className={`dish__recipe recipe__${recipeId}`}></div>
          : ingredientsEl(ingredients, maxIngredientsPerDish)
      }
    </div>;

export default connector(Dish);
