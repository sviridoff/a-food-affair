import { createSlice } from '@reduxjs/toolkit';

import { TProfile } from '../types';

const initialState: TProfile = {
  lives: 8,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
});

export default slice.reducer;
