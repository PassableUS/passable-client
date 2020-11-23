import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationState {
  status: string;  token: string;
  
}

const initialState: AuthenticationState = {
  status: "loading",
  token: null
};

export const signedIn = createAction<AuthenticationState>('auth/signedIn');
export const signedOut = createAction('auth/signedOut');


const setupSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signedIn, (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => {
      state = action.payload;
    });


    builder.addCase(signedOut, (state: AuthenticationState, action: PayloadAction) => {
      // Sets state to initial state
      Object.assign(state, initialState);
    });
  },
});

export default setupSlice.reducer;