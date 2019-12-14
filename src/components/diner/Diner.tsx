import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './diner.css';
import { TState } from '../../types';
import { selectTablesIds } from '../../selectors';
import Table from '../table/Table';

const mapStateToProps = (state: TState) => ({
  tablesIds: selectTablesIds(state),
});

const connector = connect(mapStateToProps);

type TProps = ConnectedProps<typeof connector>;

const tablesList = (tablesIds: string[]) =>
  tablesIds.map((tableId, index) =>
    <Table
      isLast={tablesIds.length === index + 1}
      tableId={tableId}
      key={tableId} />);

const Diner: FC<TProps> =
  ({ tablesIds }) =>
    <div className='diner'>
      {tablesList(tablesIds)}
    </div>;

export default connector(Diner);
