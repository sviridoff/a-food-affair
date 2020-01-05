import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergeDeepWith, concat } from 'ramda';

import { TTables, TClients } from '../types';
import gameSlice, { TStartgameProps } from './gameSlice';

const concatValues = (l: any, r: any) =>
  Array.isArray(l) ? concat(l, r) : r;

const initialState: TTables = {
  data: {
    t1: {
      id: 't1',
      liveTime: 0,
    },
    t2: {
      id: 't2',
      liveTime: 0,
    },
    t3: {
      id: 't3',
      liveTime: 0,
    },
  },
  clients: {
    t1: ['c1', 'c2'],
    t2: ['c3'],
    t3: ['c4', 'c5'],
  },
  ids: ['t1', 't2', 't3']
};

type TRemoveTableProps = {
  tableId: string,
};

export type TAddTableProps = {
  tables: TTables,
  clients: TClients,
  nextTableTime: number,
};

export type TRemoveTablesProps = {
  tablesIds: string[],
  clientsIds: string[],
};

type TSelectLiveTimeProps = {
  liveTime: number,
  tableId: string,
};

const slice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    removeTable(state, action: PayloadAction<TRemoveTableProps>) {
      const tableId = action.payload.tableId;

      delete state.data[tableId];
      delete state.clients[tableId];
      state.ids = state.ids.filter(id => tableId !== id);

      return state;
    },

    addTable(
      state,
      action: PayloadAction<TAddTableProps>,
    ) {
      return mergeDeepWith(
        concatValues,
        state,
        action.payload.tables,
      );
    },

    removeTables(state, action: PayloadAction<TRemoveTablesProps>) {
      const tableIds = action.payload.tablesIds;

      tableIds.forEach(tableId => {
        delete state.data[tableId];
        delete state.clients[tableId];
        state.ids = state.ids.filter(id => tableId !== id);
      });

      return state;
    },

    selectLiveTime(state, action: PayloadAction<TSelectLiveTimeProps>) {
      const { tableId, liveTime } = action.payload;

      state.data[tableId].liveTime = liveTime;

      return state;
    }
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      state,
      action: PayloadAction<TStartgameProps>,
    ) {
      return {
        data: {},
        clients: {},
        ids: [],
      };
    },
  },
});

export default slice;
