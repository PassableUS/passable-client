import { UserProfile } from './../../app/sessionSlice';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

export interface School {
  _id: string;
  address: string;
  city: string;
  county: string;
  countyFIPS: number;
  districtID: number;
  endingGrade: string;
  enrollmentCount: string;
  lat: number;
  level: number;
  long: number;
  name: string;
  nationalSchoolID: number;
  startingGrade: string;
  state: string;
  zipCode: number;
}

export interface UserProfileResponse {
  registrationStep: string;
  profile: UserProfile;
}

const initialState: UserProfile = {
  username: null,
  fullName: null,
  biography: null,
  profilePicture: null,
  school: null,
  gender: null,
};

export const setupFullName = createAction<string>('setup/setupFullName');
export const setupUsername = createAction<string>('setup/setupUsername');
export const setupProfilePicture = createAction<string>('setup/setupProfilePicture');
export const setupSchool = createAction<School>('setup/setupSchool');

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setupFullName, (state: UserProfile, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    });

    builder.addCase(setupUsername, (state: UserProfile, action: PayloadAction<string>) => {
      state.username = action.payload;
    });

    builder.addCase(setupProfilePicture, (state: UserProfile, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
    });

    builder.addCase(setupSchool, (state: UserProfile, action: PayloadAction<School>) => {
      state.school = action.payload;
    });
  },
});

export default setupSlice.reducer;
