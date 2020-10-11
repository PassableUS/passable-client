import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export interface District {
  id?: string;
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

export interface SetupState {
  appContext: string;
  district: District;
  userUid: string;
  school: SchoolProfileRepresentation;
  isLoggedIn: boolean;
  role: string;
  displayName: string;
  studentInformation: StudentInformationRepresentation | null;
  isLoading: boolean;
}

const initialState: SetupState = {
  appContext: 'default',
  district: null,
  userUid: null,
  school: null,
  isLoggedIn: null,
  role: null,
  displayName: null,
  studentInformation: null,
  isLoading: true,
};

export const setupAppContext = createAction<string>('setup/setupAppContext');
export const setupIsLoading = createAction<boolean>('setup/setupIsLoading');
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
    builder.addCase(setupAppContext, (state: SetupState, action: PayloadAction<string>) => {
      state.appContext = action.payload;
    });

    builder.addCase(setupIsLoading, (state: SetupState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    });

    builder.addCase(setupDistrict, (state: SetupState, action: PayloadAction<District>) => {
      state.district = action.payload;
    });

    builder.addCase(setupFirebaseUid, (state: SetupState, action: PayloadAction<string>) => {
      state.userUid = action.payload;
    });

    builder.addCase(setupDisplayName, (state: SetupState, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    });

    builder.addCase(
      setupStudentInformation,
      (state: SetupState, action: PayloadAction<StudentInformationRepresentation>) => {
        state.studentInformation = action.payload;
      }
    );

    builder.addCase(setupRole, (state: SetupState, action: PayloadAction<string>) => {
      state.role = action.payload;
    });

    // After the school is set up in the Firebase Authenticator component, the user is "signed in"
    builder.addCase(
      setupSchool,
      (state: SetupState, action: PayloadAction<SchoolProfileRepresentation>) => {
        state.school = action.payload;
        state.isLoggedIn = true;
      }
    );

    builder.addCase(signedOut, (state: SetupState, action: PayloadAction) => {
      // Sets state to initial state
      Object.assign(state, initialState);
    });
  },
});

export default setupSlice.reducer;
