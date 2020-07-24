// TODO: Address this combine reducers error
// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from './sessionSlice';
import setupSlice from '../features/login/setupSlice';

const rootReducer = combineReducers({ session: sessionSlice, setup: setupSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
