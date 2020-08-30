import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

export interface District {
  id: string;
  name: string;
}

export interface SchoolProfileRepresentation {
  schoolName: string;
  documentPath: string;
  roomCategories: any[];
}

export interface UserProfile {
  district: District;
  userUid: string;
  school: SchoolProfileRepresentation;
  isLoggedIn: boolean;
}

const initialState: UserProfile = {
  district: null,
  userUid: null,
  school: null,
  isLoggedIn: null,
};

export const setupDistrict = createAction<District>('setup/setupDistrict');
export const setupSchool = createAction<SchoolProfileRepresentation>('setup/setupSchool');
export const setupSchoolPath = createAction<string>('setup/setupSchoolPath');

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

    builder.addCase(
      setupSchool,
      (state: UserProfile, action: PayloadAction<SchoolProfileRepresentation>) => {
        state.school = action.payload;
        state.isLoggedIn = true;
      }
    );

    builder.addCase(signedOut, (state: UserProfile, action: PayloadAction) => {
      state.userUid = null;
      state.district = null;
      state.school = null;
      state.isLoggedIn = false;
    });
  },
});

export default setupSlice.reducer;
