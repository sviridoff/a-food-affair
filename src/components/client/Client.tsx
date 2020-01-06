import React, { FC, SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Client.css';
import '../../recipe.css';
import { TState, ClientStatus, TClient } from '../../types';
import { selectClient, selectClientRecipe } from '../../selectors';
import { chooseClient } from '../../actions';
import Clock from '../clock/Clock';

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
  chooseClient: (arg0: string, arg1: string, arg3: SyntheticEvent) => void
) =>
  client.status === ClientStatus.WIP
    ? { onClick: (event: SyntheticEvent) => chooseClient(client.id, recipeId, event) }
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

const clientRecipeEl = (status: ClientStatus, recipeId: string) =>
  status === ClientStatus.WIP
    ? <div className={`client__recipe recipe__${recipeId}`}></div>
    : null;

const Client: FC<TProps> =
  ({ client, recipeId, chooseClient, clientId }) =>
    <div className='client'>
      <div className='client__cloud'></div>
      {clientStatusEl(client.status)}
      {clientRecipeEl(client.status, recipeId)}
      <div
        {...onClickAttr(client, recipeId, chooseClient)}
        className={`client__client client__${clientId}`}></div>
      <Clock
        isWaiting={client.status === ClientStatus.WIP}
        createdAt={client.createdAt}
        liveTime={client.liveTime} />
    </div>;

export default connector(Client);
