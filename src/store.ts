import { configureStore, createReducer } from '@reduxjs/toolkit';

export type TTable = {
  id: string,
};

export type TTables = {
  data: { [key: string]: TTable },
  clients: { [key: string]: string[] },
};

export type TClient = {
  id: string,
};

export type TClients = {
  data: { [key: string]: TClient },
};

export type TDish = {
  id: string,
};

export type TDishes = {
  data: { [key: string]: TDish },
};

export type TState = {
  tables: TTables,
  clients: TClients,
  dishes: TDishes,
};

const preloadedState: TState = {
  tables: {
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
  },
  clients: {
    data: {
      c1: {
        id: 'c1',
      },
      c2: {
        id: 'c2',
      },
      c3: {
        id: 'c3',
      },
      c4: {
        id: 'c4',
      },
      c5: {
        id: 'c5',
      },
    },
  },
  dishes: {
    data: {
      d1: {
        id: 'd1',
      },
      d2: {
        id: 'd2',
      },
      d3: {
        id: 'd3',
      },
    },
  },
};

const reducer = createReducer({}, {
  increment: (state, action) => state + action.payload,
})

export default configureStore({
  reducer,
  preloadedState,
});
