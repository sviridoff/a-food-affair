import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TClients, ClientStatus } from '../types';

const initialState: TClients = {
  data: {
    c1: {
      id: 'c1',
      status: ClientStatus.WIP,
    },
    c2: {
      id: 'c2',
      status: ClientStatus.WIP,
    },
    c3: {
      id: 'c3',
      status: ClientStatus.WIP,
    },
    c4: {
      id: 'c4',
      status: ClientStatus.WIP,
    },
    c5: {
      id: 'c5',
      status: ClientStatus.WIP,
    },
  },
  recipes: {
    c1: 'r1',
    c2: 'r2',
    c3: 'r2',
    c4: 'r2',
    c5: 'r2',
  },
};

type TUpdateStatusProp = {
  status: ClientStatus,
  clientId: string,
};

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<TUpdateStatusProp>) {
      const { status, clientId } = action.payload;

      state.data[clientId].status = status;

      return state;
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
