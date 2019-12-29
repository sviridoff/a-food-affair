import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './Table.css';
import { TState } from '../../types';
import { selectClients } from '../../selectors';
import Client from '../client/Client';

type TOwnProps = {
  tableId: string,
};

const mapStateToProps =
  (state: TState, ownProps: TOwnProps) => ({
    clients: selectClients(state, ownProps.tableId),
  });

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector> & TOwnProps;

const clientsList = (clients: string[]) =>
  clients.map(clientId =>
    <Client
      key={clientId}
      clientId={clientId} />);

const Table: FC<TProps> =
  ({ clients }) =>
    <div className='table'>
      {clientsList(clients)}
    </div>;

export default connector(Table);
