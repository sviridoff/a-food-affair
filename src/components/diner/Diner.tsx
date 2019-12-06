import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './diner.css';
import { TState, TTable } from '../../types';
import { selectTables } from '../../selectors';
import Table from '../table/Table';

const mapStateToProps = (state: TState) => ({
  tables: selectTables(state),
});

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

const tablesList = (tables: TTable[]) =>
  tables.map((table, index) =>
    <Table
      isLast={tables.length === index + 1}
      table={table}
      key={table.id} />);

const Diner: FC<TProps> =
  ({ tables }) =>
    <div className='diner'>
      {tablesList(tables)}
    </div>;

export default connector(Diner);
