import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Dish.css';
import { TState, TIngredient } from '../../types';
import { selectDish, makeSelectIngredients } from '../../selectors';
import { chooseDish } from '../../actions';

const maxIngredientsPerDish = 4;

type TOwnProps = {
  isLast: boolean,
  dishId: string,
};

const makeMapStateToProps = () => {
  const selectIngredients = makeSelectIngredients();

  return (state: TState, ownProps: TOwnProps) => ({
    dish: selectDish(state, ownProps.dishId),
    ingredients: selectIngredients(state, ownProps.dishId),
    allRecipeIngredients: state.recipes.ingredients,
  });
};

const mapDispatchToProps = { chooseDish };

const connector = connect(makeMapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const ingredientClass = (length: number) =>
  classnames(
    'dish__ingredient',
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
          className={ingredientClass(ingredients.length)}
          key={`${ingredient.id}-${index}`}>
          {ingredient.id}
        </div>);

const dishClass = (isSelected: boolean, isLast: boolean) =>
  classnames(
    'dish',
    {
      'dish--last': isLast,
      'dish--is-selected': isSelected,
    }
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

const getRecipeId = (
  ingredients: TIngredient[],
  allRecipeIngredients: { [key: string]: string[] },
) => {
  const dishIngredients = ingredients
    .map(ingredient => ingredient.id)
    .slice()
    .sort();
  const recipe = Object.entries(allRecipeIngredients)
    .find(([recipeId, ingredientsIds]) =>
      dishIngredients.length === ingredientsIds.length
      && ingredientsIds
        .slice()
        .sort()
        .every((ingredientId, index) => ingredientId === dishIngredients[index]));
  let recipeId;

  if (recipe) {
    recipeId = recipe[0];
  }

  return recipeId;
};

const Dish: FC<TProps> =
  ({
    dish,
    dishId,
    isLast,
    ingredients,
    chooseDish,
    allRecipeIngredients,
  }) => {
    const recipeId = getRecipeId(ingredients, allRecipeIngredients);

    return <div
      className={dishClass(dish.isSelected, isLast)}
      onClick={() => chooseDish(dishId)}>
      {
        recipeId
          ? <div className='dish__recipe'>{recipeId}</div>
          : ingredientsEl(ingredients, maxIngredientsPerDish)
      }
    </div>;
  }

export default connector(Dish);
