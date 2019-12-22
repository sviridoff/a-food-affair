import React, { FC } from 'react';
import classnames from 'classnames';

import './Recipes.css';
import { TState, TIngredient, VisibleModalType } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { selectClientIngredients } from '../../selectors';
import uiSlice from '../../slices/uiSlice';

const mapStateToProps = (state: TState) => ({
  ingredients: selectClientIngredients(state),
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
      <div
        className='recipes__ingredient'
        key={`${ingredient.id}-${index}`}>
        {ingredient.id}
      </div>
    );

const recipesClass =
  (isVisible: boolean) =>
    classnames(
      'recipes',
      { 'recipes--visible': isVisible },
    );

const Recipes: FC<TProps> =
  ({ ingredients, isVisible, hideRecipes }) =>
    <div className={recipesClass(isVisible)}>
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
