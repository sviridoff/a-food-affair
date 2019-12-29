import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Client.css';
import { TState, ClientStatus, TClient } from '../../types';
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

const onClickAttr = (
  client: TClient,
  recipeId: string,
  chooseClient: (arg0: string, arg1: string) => void
) =>
  client.status === ClientStatus.WIP
    ? { onClick: () => chooseClient(client.id, recipeId) }
    : {};

const Client: FC<TProps> =
  ({ isLast, client, recipeId, chooseClient }) =>
    <div
      {...onClickAttr(client, recipeId, chooseClient)}
      className={clientClass(isLast)}>
      {client.status}
      {recipeId}
      <div className='client__clock'></div>
    </div>;

export default connector(Client);
