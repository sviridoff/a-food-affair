import React, { FC } from 'react';
import classnames from 'classnames';

import './recipes.css';
import { TState, TIngredient } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { selectClientIngredients } from '../../selectors';
import { actions as uiActions } from '../../reducers/uiReducer';

const mapStateToProps = (state: TState) => ({
  ingredients: selectClientIngredients(state),
  isRecipesVisible: state.ui.isRecipesVisible,
});

const mapDispatchToProps = {
  hideRecipes: uiActions.hideRecipes,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const ingredientsList =
  (ingredients: TIngredient[]) =>
    ingredients.map((ingredient, index) =>
      <div
        className='recipes__ingredient'
        key={`${ingredient.id}-${index}`}>
        {ingredient.id}
      </div>
    );

const recipesClass =
  (isRecipesVisible: boolean) =>
    classnames(
      'recipes',
      { 'recipes--visible': isRecipesVisible },
    );

const Recipes: FC<TProps> =
  ({ ingredients, isRecipesVisible, hideRecipes }) =>
    <div className={recipesClass(isRecipesVisible)}>
      <div className='recipe__list'>
        {ingredientsList(ingredients)}
      </div>
      <div className='recipe__controls'>
        <div
          className='recipe__close-btn'
          onClick={hideRecipes}></div>
      </div>
    </div>;

export default connector(Recipes);
