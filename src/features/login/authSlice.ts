import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationState {
  profile?: AuthenticationProfile;
  status: string;
  token: string;
  uid: string;
}
export interface AuthenticationProfile {
  firstName: string;
  lastName: string;
  permissions: string[];
}

const initialState: AuthenticationState = {
  profile: {
    firstName: null,
    lastName: null,
    permissions: [],
  },
  status: 'loading',
  token: null,
  uid: null,
};

export const signedIn = createAction<AuthenticationState>('auth/signedIn');
export const setProfileData = createAction<AuthenticationProfile>('auth/profileData');
export const updateToken = createAction<string>('auth/updateToken');
export const signedOut = createAction('auth/signedOut');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      signedIn,
      (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => {
        state.status = action.payload.status;
        state.token = action.payload.token;
        state.uid = action.payload.uid;
      }
    );

    builder.addCase(updateToken, (state: AuthenticationState, action: PayloadAction<string>) => {
      state.token = action.payload;
    });

    builder.addCase(
      setProfileData,
      (state: AuthenticationState, action: PayloadAction<AuthenticationProfile>) => {
        state.profile.permissions = action.payload.permissions;
        state.profile.firstName = action.payload.firstName;
        state.profile.lastName = action.payload.lastName;
      }
    );

    builder.addCase(signedOut, (state: AuthenticationState, action: PayloadAction) => {
      // Sets state to initial state
      Object.assign(state, initialState);
    });
  },
});

export default authSlice.reducer;
