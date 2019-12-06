import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './table.css';
import { TState, TTable, TClient } from '../../types';
import { makeSelectClients } from '../../selectors';

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

const clientClass = (isLast: boolean) =>
  classnames(
    'table__client-btn',
    { 'table__client-btn--last': isLast },
  );

const clientsList = (clients: TClient[]) =>
  clients.map((client, index) =>
    <div
      className={clientClass(index + 1 === clients.length)}
      key={client.id}>
      <div className='table__client-clock'></div>
    </div>
  );

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
