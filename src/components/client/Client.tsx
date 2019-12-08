import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './client.css';
import { TState, ClientStatus } from '../../types';
import { selectClient, selectClientRecipe } from '../../selectors';
import { chooseClient } from '../../actions';

type TOwnProps = {
  clientId: string;
  isLast: boolean;
};

const mapStateToProps =
  (state: TState, ownProps: TOwnProps) => ({
    client: selectClient(state, ownProps.clientId),
    recipeId: selectClientRecipe(state, ownProps.clientId),
  });

const mapDispatchToProps = { chooseClient };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const clientClass = (isLast: boolean) =>
  classnames(
    'client',
    { 'client--last': isLast },
  );

const Client: FC<TProps> =
  ({ isLast, clientId, client, recipeId, chooseClient }) =>
    <div
      {...(
        client.status === ClientStatus.WIP
        && { onClick: () => chooseClient(clientId, recipeId) }
      )}
      className={clientClass(isLast)}>
      {client.status}
      {recipeId}
      <div className='client__clock'></div>
    </div>;

export default connector(Client);
