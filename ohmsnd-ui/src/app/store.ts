import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userInfoReducer from '../features/userInfoSlice'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // axios: axiosReducer,
    // authenticationService: authenticationServiceReducer
    userInfo: userInfoReducer,
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
