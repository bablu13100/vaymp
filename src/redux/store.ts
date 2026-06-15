import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
} from 'redux-persist';

import bagReducer from './bagSlice';
import productsReducer from './productsSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  bag: bagReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bag'],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor =
  persistStore(store);

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;