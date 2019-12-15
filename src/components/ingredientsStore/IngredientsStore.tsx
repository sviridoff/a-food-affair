import React, { FC } from 'react';
import classnames from 'classnames';

import './ingredientsStore.css';
import { connect, ConnectedProps } from 'react-redux';
import { TState, TIngredient, VisibleModalType } from '../../types';
import { selectIngredients } from '../../selectors';
import { chooseIngredient, closeIngredientsStore } from '../../actions';

const mapStateToProps =
  (state: TState) => ({
    ingredients: selectIngredients(state),
    isVisible:
      state.ui.modalType === VisibleModalType.INGREDIENTS_STORE,
  });

const mapDispatchToProps = {
  chooseIngredient,
  closeIngredientsStore,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const ingredientsList =
  (
    ingredients: TIngredient[],
    chooseIngredient: (ingredientId: string) => void,
  ) =>
    ingredients.map(ingredient =>
      <div
        className='ingredients-store__ingredient'
        key={ingredient.id}
        onClick={() => chooseIngredient(ingredient.id)}>
        {ingredient.id}
      </div>
    );

const ingredientsStoreClass =
  (isVisible: boolean) =>
    classnames(
      'ingredients-store',
      { 'ingredients-store--visible': isVisible },
    );

const IngredientsStore: FC<TProps> =
  ({
    ingredients,
    isVisible,
    chooseIngredient,
    closeIngredientsStore,
  }) =>
    <div
      className={ingredientsStoreClass(isVisible)}>
      <div className='ingredients-store__list'>
        {ingredientsList(ingredients, chooseIngredient)}
      </div>
      <div className='ingredients-store__controls'>
        <div
          className='ingredients-store__close-btn'
          onClick={closeIngredientsStore}></div>
      </div>
    </div>

export default connector(IngredientsStore);
