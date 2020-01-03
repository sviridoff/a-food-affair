import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Dish.css';
import '../../ingredient.css';
import '../../recipe.css';
import { TState, TIngredient } from '../../types';
import { selectDish, makeSelectIngredients } from '../../selectors';
import { chooseDish } from '../../actions';

const maxIngredientsPerDish = 4;

type TOwnProps = {
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
    ingredients,
    chooseDish,
    allRecipeIngredients,
  }) => {
    const recipeId = getRecipeId(ingredients, allRecipeIngredients);

    return <div
      className={dishClass(dish.isSelected)}
      onClick={() => chooseDish(dishId)}>
      {
        recipeId
          ? <div className={`dish__recipe recipe__${recipeId}`}></div>
          : ingredientsEl(ingredients, maxIngredientsPerDish)
      }
    </div>;
  }

export default connector(Dish);
