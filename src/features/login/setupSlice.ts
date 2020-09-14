import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export interface District {
  documentPath: string;
  name: string;
}

export interface SchoolProfileRepresentation {
  schoolName: string;
  documentPath: string;
  roomCategories: any[];
}

export interface StudentInformationRepresentation {
  courseEnrollments?: any[];
  schoolIssuedStudentId?: string;
  documentPath: string;
}

export interface UserProfile {
  district: District;
  userUid: string;
  school: SchoolProfileRepresentation;
  isLoggedIn: boolean;
  role: string;
  displayName: string;
  studentInformation: StudentInformationRepresentation | null;
}

const initialState: UserProfile = {
  district: null,
  userUid: null,
  school: null,
  isLoggedIn: null,
  role: null,
  displayName: null,
  studentInformation: null,
};

export const setupDistrict = createAction<District>('setup/setupDistrict');
export const setupSchool = createAction<SchoolProfileRepresentation>('setup/setupSchool');
export const setupSchoolPath = createAction<string>('setup/setupSchoolPath');
export const setupRole = createAction<string>('setup/setupRole');
export const setupDisplayName = createAction<string>('setup/setupDisplayName');
export const setupStudentInformation = createAction<StudentInformationRepresentation>(
  'setup/setupStudentInformation'
);

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

    builder.addCase(setupDisplayName, (state: UserProfile, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    });

    builder.addCase(
      setupStudentInformation,
      (state: UserProfile, action: PayloadAction<StudentInformationRepresentation>) => {
        state.studentInformation = action.payload;
      }
    );

    builder.addCase(setupRole, (state: UserProfile, action: PayloadAction<string>) => {
      state.role = action.payload;
    });

    builder.addCase(
      setupSchool,
      (state: UserProfile, action: PayloadAction<SchoolProfileRepresentation>) => {
        state.school = action.payload;
        state.isLoggedIn = true;
      }
    );

    builder.addCase(signedOut, (state: UserProfile, action: PayloadAction) => {
      state = initialState;
    });
  },
});

export default setupSlice.reducer;
