import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationState {
  status: string;  token: string;
  
}

const initialState: AuthenticationState = {
  status: "loading",
  token: null
};

export const signedIn = createAction<AuthenticationState>('auth/signedIn');
export const updateToken = createAction<string>('auth/updateToken');
export const signedOut = createAction('auth/signedOut');


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signedIn, (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => {
      state.status = action.payload.status;
      state.token = action.payload.token;
    });

    builder.addCase(updateToken, (state: AuthenticationState, action: PayloadAction<string>) => {
      state.token = action.payload;
    });


    builder.addCase(signedOut, (state: AuthenticationState, action: PayloadAction) => {
      // Sets state to initial state
      Object.assign(state, initialState);
    });
  },
});

export default authSlice.reducer;
