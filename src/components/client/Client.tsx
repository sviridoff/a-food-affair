import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Client.css';
import { TState, ClientStatus, TClient } from '../../types';
import { selectClient, selectClientRecipe } from '../../selectors';
import { chooseClient } from '../../actions';

type TOwnProps = {
  clientId: string,
};

const mapStateToProps =
  (state: TState, ownProps: TOwnProps) => ({
    client: selectClient(state, ownProps.clientId),
    recipeId: selectClientRecipe(state, ownProps.clientId),
  });

const mapDispatchToProps = { chooseClient };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const onClickAttr = (
  client: TClient,
  recipeId: string,
  chooseClient: (arg0: string, arg1: string) => void
) =>
  client.status === ClientStatus.WIP
    ? { onClick: () => chooseClient(client.id, recipeId) }
    : {};

const clientStatusClass = (status: ClientStatus) =>
  classnames({
    'client__ok': status === ClientStatus.OK,
    'client__ko': status === ClientStatus.KO,
  });

const clientStatusEl = (status: ClientStatus) =>
  status !== ClientStatus.WIP
    ? <div className={clientStatusClass(status)}></div>
    : null;

const Client: FC<TProps> =
  ({ client, recipeId, chooseClient }) =>
    <div
      {...onClickAttr(client, recipeId, chooseClient)}
      className='client'>
      <div className='client__cloud'></div>
      {clientStatusEl(client.status)}
    </div>;

export default connector(Client);
