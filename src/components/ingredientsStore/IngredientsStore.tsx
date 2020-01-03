import React, { FC } from 'react';
import classnames from 'classnames';

import './IngredientsStore.css';
import '../../ingredient.css';
import { connect, ConnectedProps } from 'react-redux';
import { TState, VisibleModalType } from '../../types';
import { selectLevelIngredientsIds } from '../../selectors';
import { chooseIngredient, closeIngredientsStore } from '../../actions';

const mapStateToProps =
  (state: TState) => ({
    ingredientsIds: selectLevelIngredientsIds(state),
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
    ingredientsIds: string[],
    chooseIngredient: (ingredientId: string) => void,
  ) =>
    ingredientsIds.map(ingredientId =>
      <div
        className={`ingredients-store__ingredient ingredient__${ingredientId}`}
        key={ingredientId}
        onClick={() => chooseIngredient(ingredientId)}>
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
    ingredientsIds,
    isVisible,
    chooseIngredient,
    closeIngredientsStore,
  }) =>
    <div
      className={ingredientsStoreClass(isVisible)}>
      <div className='ingredients-store__list'>
        {ingredientsList(ingredientsIds, chooseIngredient)}
      </div>
      <div className='ingredients-store__controls'>
        <div
          className='ingredients-store__close-btn'
          onClick={closeIngredientsStore}></div>
      </div>
    </div>

export default connector(IngredientsStore);
