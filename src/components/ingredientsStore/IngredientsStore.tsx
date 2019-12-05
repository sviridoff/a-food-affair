import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import './ingredientsStore.css';
import { connect, ConnectedProps } from 'react-redux';
import { TState, TIngredient } from '../../types';
import { selectIngredients } from '../../selectors';
import { actions } from '../../reducers/uiReducer';

const mapStateToProps = (state: TState) => ({
  ingredients: selectIngredients(state),
  isIngredientsStoreVisible: state.ui.isIngredientsStoreVisible,
});

const mapDispatchToProps = ({
  hideIngredientsStore: actions.hideIngredientsStore,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

const ingredientsList = (ingredients: TIngredient[]) =>
  ingredients.map(ingredient =>
    <div
      className='ingredients-store__ingredient'
      key={ingredient.id}>
      {ingredient.id}
    </div>
  );

const ingredientsStoreClass = (isIngredientsStoreVisible: boolean) =>
  classnames(
    'ingredients-store',
    { 'ingredients-store--visible': isIngredientsStoreVisible },
  );

const IngredientsStore: FunctionComponent<TProps> =
  ({ ingredients, isIngredientsStoreVisible, hideIngredientsStore }) =>
    <div
      className={ingredientsStoreClass(isIngredientsStoreVisible)}>
      {ingredientsList(ingredients)}
      <div
        className='ingredients-store__close-btn'
        onClick={hideIngredientsStore}></div>
    </div>

export default connector(IngredientsStore);
