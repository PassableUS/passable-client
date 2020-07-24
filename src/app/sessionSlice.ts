import {
  createAsyncThunk,
  createSlice,
  unwrapResult,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';

import { setAxiosToken } from '../utils/axios';
import sessionAPI from './sessionAPI';
import { RootState } from './rootReducer';
import { Alert } from 'react-native';
import { School } from '../features/login/setupSlice';

// Sample types that will be used
// interface User {
//   firebaseToken: string
// }

// interface ValidationErrors {
//   errorMessage: string
// }

// interface UpdateUserResponse {
//   user: User
//   success: boolean
// }

// const fetchFirebaseUser = createAsyncThunk<
//   User,
//   Partial<User>,
//   {
//     rejectValue: ValidationErrors
//   }
// >('users/update', async (userToken, { rejectWithValue }) => {
//   try {
//     const { id, ...fields } = userData
//     const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
//     return response.data.user
//   } catch (err) {
//     let error: AxiosError<ValidationErrors> = err // cast the error for access
//     if (!error.response) {
//       throw err
//     }
//     // We got validation errors, let's return those so we can reference in our component and set form errors
//     return rejectWithValue(error.response.data)
//   }
// })

export interface UserProfileResponse {
  registrationStep: string;
  profile: UserProfile;
}
export interface UserProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicture: string;
  school: School;
  gender: string;
}

interface SessionState {
  registrationStep: string;
  firebaseToken: string | null;
  hasCompletedProfile: boolean;
  isLoggedIn: boolean;
  isFirebaseInitializedAndLoaded: boolean;
  isProfileInitializedAndLoaded: boolean;
  profile: UserProfile;
}

const initialState: SessionState = {
  firebaseToken: null,
  hasCompletedProfile: false,
  isLoggedIn: false,
  // IS LOADING FALSE = HAS BEEN INITIALIZED, NOT NECESSARILY LOADING
  isFirebaseInitializedAndLoaded: false,
  isProfileInitializedAndLoaded: false,
  registrationStep: 'uninitialized',
  profile: {
    username: null,
    fullName: null,
    biography: null,
    profilePicture: null,
    school: null,
    gender: null,
  },
};

export const setFirebaseToken = createAction<string>('session/setFirebaseToken');
export const signedOut = createAction('session/signedOut');

export const fetchSessionProfile = createAsyncThunk(
  'session/fetchSessionProfile',
  async (_, thunkAPI: any) => {
    try {
      const data = await sessionAPI.getProfile();
      // alert(JSON.stringify(data));
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(setFirebaseToken, (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;

      // Sets the axios token so that we can make authorized requests
      setAxiosToken(action.payload);
      state.isLoggedIn = true;
      state.isFirebaseInitializedAndLoaded = true;
    });

    builder.addCase(signedOut, (state, action: PayloadAction) => {
      state.firebaseToken = null;

      // Sets the axios token so that we can make authorized requests
      setAxiosToken(null);
      state.isLoggedIn = false;
      state.hasCompletedProfile = false;
      state.isFirebaseInitializedAndLoaded = true;
      state.isProfileInitializedAndLoaded = true;
    });

    builder.addCase(fetchSessionProfile.pending, (state, action) => {});

    // Successfully retrieved profile for the app to use
    builder.addCase(
      fetchSessionProfile.fulfilled,
      (state, action: PayloadAction<UserProfileResponse>) => {
        state.isProfileInitializedAndLoaded = true;

        state.profile = action.payload.profile;
        state.registrationStep = action.payload.registrationStep;

        if (action.payload.registrationStep === 'finished') {
          state.hasCompletedProfile = true;
        }
      }
    );

    // Was unable to retrieve the profile for the app to use
    builder.addCase(fetchSessionProfile.rejected, (state, action) => {});
  },
});

export default sessionSlice.reducer;
