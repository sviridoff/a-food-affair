import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';

import './table.css';
import { TState, TTable, TClient } from '../../types';
import { selectClients } from '../../selectors';

type TOwnProps = {
  table: TTable,
  isLast: boolean,
};

const mapStateToProps = (state: TState, ownProps: TOwnProps) => ({
  clients: selectClients(ownProps.table.id)(state),
});

const connector = connect(mapStateToProps);

type TReduxProps = ConnectedProps<typeof connector>;
type TProps = TReduxProps & TOwnProps;

const clientClass = (cleints: TClient[], index: number) =>
  classnames(
    'table__client-btn',
    { 'table__client-btn--last': index + 1 === cleints.length },
  );

const clientsList = (clients: TClient[]) =>
  clients.map((client, index) =>
    <div className={clientClass(clients, index)} key={client.id}>
      <div className='table__client-clock'></div>
    </div>
  );

const tableClass = (isLast: boolean) =>
  classnames(
    'table',
    { 'table--last': isLast },
  );

const Table: FunctionComponent<TProps> =
  ({ clients, isLast }) =>
    <div className={tableClass(isLast)}>
      {clientsList(clients)}
    </div>;

export default connector(Table);
