import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import axiosReducer from '../features/axios/axiosSlice';
import authenticationServiceReducer from '../features/authentication/authenticationSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    axios: axiosReducer,
    authenticationService: authenticationServiceReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
