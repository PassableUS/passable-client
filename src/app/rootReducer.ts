// TODO: Address this combine reducers error
// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';
import setupSlice from '../features/login/setupSlice';

const rootReducer = combineReducers({ setup: setupSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
