import React, { FC } from 'react';
import classnames from 'classnames';

import './Recipes.css';
import '../../ingredient.css';
import '../../recipe.css';
import { TState, TIngredient, VisibleModalType } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { selectClientIngredients } from '../../selectors';
import uiSlice from '../../slices/uiSlice';

const mapStateToProps = (state: TState) => ({
  ingredients: selectClientIngredients(state),
  recipeId: state.ui.selectedRecipe,
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
    ingredients.map((ingredient, index) => (
      <>
        <div
          className={`recipes__ingredient ingredient__${ingredient.id}`}
          key={`${ingredient.id}-${index}`}></div>
        {index !== ingredients.length - 1
          ? <div className='recipes__symbol'>+</div>
          : null
        }
      </>));

const recipesClass =
  (isVisible: boolean) =>
    classnames(
      'recipes',
      { 'recipes--visible': isVisible },
    );

const Recipes: FC<TProps> =
  ({ ingredients, recipeId, isVisible, hideRecipes }) =>
    <div className={recipesClass(isVisible)}>
      <div className='recipes__list'>
        {ingredientsList(ingredients)}
        <div className='recipes__symbol'>=</div>
        <div className={`recipes__recipe recipe__${recipeId}`}></div>
      </div>
      <div className='recipes__controls'>
        <div
          className='recipes__close-btn'
          onClick={hideRecipes}></div>
      </div>
    </div>;

export default connector(Recipes);
