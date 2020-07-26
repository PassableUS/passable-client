import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

export interface District {
  id: string;
  name: string;
}

export interface UserProfile {
  district: District;
}

const initialState: UserProfile = {
  district: null,
};

export const setupDistrict = createAction<District>('setup/setupDistrict');

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setupDistrict, (state: UserProfile, action: PayloadAction<District>) => {
      state.district = action.payload;
    });
  },
});

export default setupSlice.reducer;
