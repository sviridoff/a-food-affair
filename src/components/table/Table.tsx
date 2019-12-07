import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './table.css';
import { TState, TTable, TClient } from '../../types';
import { makeSelectClients } from '../../selectors';
import Client from '../client/Client';

type TOwnProps = {
  table: TTable,
  isLast: boolean,
};

const makeMapStateToProps = () => {
  const selectClients = makeSelectClients();

  return (state: TState, ownProps: TOwnProps) => ({
    clients: selectClients(state, ownProps.table.id),
  });
};

const connector = connect(makeMapStateToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const clientsList = (clients: TClient[]) =>
  clients.map((client, index) =>
    <Client
      key={client.id}
      clientId={client.id}
      isLast={index + 1 === clients.length} />);

const tableClass = (isLast: boolean) =>
  classnames(
    'table',
    { 'table--last': isLast },
  );

const Table: FC<TProps> =
  ({ clients, isLast }) =>
    <div className={tableClass(isLast)}>
      {clientsList(clients)}
    </div>;

export default connector(Table);
