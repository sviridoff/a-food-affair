import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergeDeepWith, concat } from 'ramda';

import { TClients, ClientStatus } from '../types';

const concatValues = (l: any, r: any) =>
  Array.isArray(l) ? concat(l, r) : r;

const initialState: TClients = {
  data: {
    c1: {
      id: 'c1',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
    },
    c2: {
      id: 'c2',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
    },
    c3: {
      id: 'c3',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
    },
    c4: {
      id: 'c4',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
    },
    c5: {
      id: 'c5',
      status: ClientStatus.WIP,
      coins: 100,
      createdAt: 0,
    },
  },
  recipes: {
    c1: 'r1',
    c2: 'r2',
    c3: 'r2',
    c4: 'r2',
    c5: 'r2',
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

type TRemoveClientsProps = {
  clientsIds: string[],
};

type TAddClientsProps = {
  clients: TClients,
};

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<TUpdateStatusProps>) {
      const { status, clientId } = action.payload;

      state.data[clientId].status = status;

      return state;
    },

    removeClients(state, action: PayloadAction<TRemoveClientsProps>) {
      const clientsIds = action.payload.clientsIds;

      clientsIds.forEach(id => {
        delete state.data[id];
        delete state.recipes[id];
        delete state.tables[id];
      });

      state.ids = state.ids.filter(id => !clientsIds.includes(id));

      return state;
    },

    restartClients(state) {
      state = {
        data: {},
        recipes: {},
        ids: [],
        tables: {},
      };

      return state;
    },

    addClients(state, action: PayloadAction<TAddClientsProps>) {
      const clients = action.payload.clients;

      state = mergeDeepWith(concatValues, state, clients);

      return state;
    }
  }
});

export default slice;
