import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './Table.css';
import { TState } from '../../types';
import { selectClients } from '../../selectors';
import Client from '../client/Client';

type TOwnProps = {
  tableId: string,
  isLast: boolean,
};

const mapStateToProps =
  (state: TState, ownProps: TOwnProps) => ({
    clients: selectClients(state, ownProps.tableId),
  });

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const clientsList = (clients: string[]) =>
  clients.map((id, index) =>
    <Client
      key={id}
      clientId={id}
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
