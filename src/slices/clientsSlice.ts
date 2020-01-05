import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergeDeepWith, concat } from 'ramda';

import { TClients, ClientStatus } from '../types';
import gameSlice, { TStartgameProps } from './gameSlice';
import tablesSlice, {
  TRemoveTablesProps,
  TAddTableProps,
} from './tablesSlice';

const concatValues = (l: any, r: any) =>
  Array.isArray(l) ? concat(l, r) : r;

const initialState: TClients = {
  data: {
    c1: {
      id: 'c1',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
      liveTime: 5000,
    },
    c2: {
      id: 'c2',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
      liveTime: 5000,
    },
    c3: {
      id: 'c3',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
      liveTime: 5000,
    },
    c4: {
      id: 'c4',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
      liveTime: 5000,
    },
    c5: {
      id: 'c5',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
      liveTime: 5000,
    },
  },
  recipes: {
    c1: 'donut-kitkat',
    c2: 'donut-kitkat',
    c4: 'donut-oreo',
  },
  ids: ['c1', 'c2', 'c3', 'c4', 'c5'],
  tables: {
    c1: 't1',
    c2: 't1',
    c3: 't2',
    c4: 't3',
    c5: 't3',
  }
};

type TUpdateStatusProps = {
  status: ClientStatus,
  clientId: string,
};

type TUpdateStatusesProps = {
  status: ClientStatus,
  clientIds: string[],
};

export type TSetOkProps = {
  clientId: string,
  dishId: string,
};

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<TUpdateStatusProps>) {
      const { status, clientId } = action.payload;

      state.data[clientId].status = status;
    },

    updateStatuses(
      state,
      action: PayloadAction<TUpdateStatusesProps>,
    ) {
      const { status, clientIds } = action.payload;

      clientIds.forEach(clientId => {
        state.data[clientId].status = status;
      });
    },

    setOk(
      state,
      action: PayloadAction<TSetOkProps>,
    ) {
      const clientId = action.payload.clientId;

      state.data[clientId].status = ClientStatus.OK;
    },

    setKo(
      state,
      action: PayloadAction<TSetOkProps>,
    ) {
      const clientId = action.payload.clientId;

      state.data[clientId].status = ClientStatus.KO;
    },
  },
  extraReducers: {
    [gameSlice.actions.startgame.type](
      _,
      action: PayloadAction<TStartgameProps>,
    ): TClients {
      return {
        data: {},
        recipes: {},
        ids: [],
        tables: {},
      };
    },

    [tablesSlice.actions.removeTables.type](
      state,
      action: PayloadAction<TRemoveTablesProps>,
    ) {
      const clientsIds = action.payload.clientsIds;

      clientsIds.forEach(id => {
        delete state.data[id];
        delete state.recipes[id];
        delete state.tables[id];
      });

      state.ids = state.ids
        .filter(id => !clientsIds.includes(id));
    },

    [tablesSlice.actions.addTable.type](
      state,
      action: PayloadAction<TAddTableProps>,
    ) {
      return mergeDeepWith(
        concatValues,
        state,
        action.payload.clients,
      );
    }
  },
});


export default slice;
