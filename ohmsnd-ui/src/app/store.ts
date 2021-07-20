import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import userInfoReducer from '../features/userInfoSlice'
import counterReducer from '../features/counter/counterSlice'
import {FLUSH,  REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  counter: counterReducer,
  // axios: axiosReducer,
  // authenticationService: authenticationServiceReducer
  userInfo: userInfoReducer,
})

const persistConfig = {key:'root', storage};
const persistedReducer = persistReducer(persistConfig, reducers )

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

