import React, { FC } from 'react';
import { connect, ConnectedProps, batch } from 'react-redux';
import classnames from 'classnames';

import './client.css';
import { TState } from '../../types';
import { selectClient, selectClientRecipe } from '../../selectors';
import { actions as uiActions } from '../../reducers/uiReducer';

type TOwnProps = {
  clientId: string;
  isLast: boolean;
};

const mapStateToProps =
  (state: TState, ownProps: TOwnProps) => ({
    client: selectClient(state, ownProps.clientId),
    recipeId: selectClientRecipe(state, ownProps.clientId),
  });

const mapDispatchToProps = {
  selectRecipe: uiActions.selectRecipe,
  showRecipes: uiActions.showRecipes,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const clientClass = (isLast: boolean) =>
  classnames(
    'client',
    { 'client--last': isLast },
  );

const Client: FC<TProps> =
  ({ isLast, selectRecipe, recipeId, showRecipes }) =>
    <div
      className={clientClass(isLast)}
      onClick={() => {
        batch(() => {
          selectRecipe({ recipeId });
          showRecipes();
        });
      }}>
      <div className='client__clock'></div>
    </div>;

export default connector(Client);
