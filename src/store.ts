import { configureStore } from '@reduxjs/toolkit';

const preloadedState = {
  tables: {
    data: {
      t1: {
        id: 't1'
      },
      t2: {
        id: 't2'
      }
    },
    clients: {
      t1: ['c1', 'c2'],
      t2: ['c3']
    }
  },
  clients: {
    c1: {
      id: 'c1'
    },
    c2: {
      id: 'c2'
    },
    c3: {
      id: 'c3'
    }
  },
  dishes: {
    d1: {
      id: 'd1'
    },
    d2: {
      id: 'd2'
    },
    d3: {
      id: 'd3'
    }
  }
};

export default configureStore({ reducer: {}, preloadedState });
