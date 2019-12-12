import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TTables } from '../types';

const initialState: TTables = {
  data: {
    t1: {
      id: 't1',
    },
    t2: {
      id: 't2',
    },
    t3: {
      id: 't3',
    },
  },
  clients: {
    t1: ['c1', 'c2'],
    t2: ['c3'],
    t3: ['c4', 'c5'],
  },
};

type TRemoveTableProps = {
  tableId: string,
};

type TAddTableProps = {
  clients: {
    id: string,
    recipeId: string,
  }[],
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

      return state;
    },

    restartTables(state) {
      state.data = {};
      state.clients = {};

      return state;
    },

    addTable(state, action: PayloadAction<TAddTableProps>) {
      const { clients, tableId } = action.payload;

      state.data[tableId] = {
        id: tableId,
      };

      state.clients[tableId] = clients.map(c => c.id);

      return state;
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
