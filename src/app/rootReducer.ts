// TODO: Address this combine reducers error
// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';
import setupSlice from '../features/login/setupSlice';
import authSlice from '../features/login/authSlice';

const rootReducer = combineReducers({ setup: setupSlice, auth: authSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
