import React, { FC, Fragment } from 'react';
import classnames from 'classnames';

import './Recipes.css';
import '../../ingredient.css';
import '../../recipe.css';
import { TState, TIngredient, VisibleModalType } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { selectClientIngredients } from '../../selectors';
import uiSlice from '../../slices/uiSlice';
import { btnEffect } from '../../libs/btnEffect';

const mapStateToProps = (state: TState) => ({
  ingredients: selectClientIngredients(state),
  recipeId: state.ui.selectedRecipeId,
  isVisible: state.ui.modalType === VisibleModalType.RECIPES,
});

const mapDispatchToProps = {
  hideRecipes: () => uiSlice.actions.selectVisibleModalType({
    modalType: VisibleModalType.NONE,
  }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const ingredientsList =
  (ingredients: TIngredient[]) =>
    ingredients.map((ingredient, index) =>
      <Fragment key={`${ingredient.id}-${index}`}>
        <div
          className={`recipes__ingredient ingredient__${ingredient.id}`}>
        </div>
        {index !== ingredients.length - 1
          ? <div className='recipes__symbol'>+</div>
          : null
        }
      </Fragment>);

const recipesClass =
  (isVisible: boolean) =>
    classnames(
      'recipes',
      { 'recipes--visible': isVisible },
    );

const Recipes: FC<TProps> =
  ({ ingredients, recipeId, isVisible, hideRecipes }) =>
    isVisible
      ? <div className={recipesClass(isVisible)}>
        <div className='recipes__list'>
          {ingredientsList(ingredients)}
          <div className='recipes__symbol'>=</div>
          <div className={`recipes__recipe recipe__${recipeId}`}></div>
        </div>
        <div className='recipes__controls'>
          <div
            className='recipes__close-btn'
            onClick={btnEffect(hideRecipes)}></div>
        </div>
      </div>
      : null;

export default connector(Recipes);
