import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

export interface District {
  id: string;
  name: string;
}

export interface UserProfile {
  district: District;
  userUid: string;
}

const initialState: UserProfile = {
  district: null,
  userUid: null,
};

export const setupDistrict = createAction<District>('setup/setupDistrict');
export const signedOut = createAction('setup/signedOut');
export const setupFirebaseUid = createAction<string>('setup/FirebaseUid');

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setupDistrict, (state: UserProfile, action: PayloadAction<District>) => {
      state.district = action.payload;
    });

    builder.addCase(setupFirebaseUid, (state: UserProfile, action: PayloadAction<string>) => {
      state.userUid = action.payload;
    });

    builder.addCase(signedOut, (state: UserProfile, action: PayloadAction) => {
      state.userUid = null;
    });
  },
});

export default setupSlice.reducer;
