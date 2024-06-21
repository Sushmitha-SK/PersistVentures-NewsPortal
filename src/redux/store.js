import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import newsReducer from './slice/newsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['newsData', 'favorites', 'articleDetails']
};

const persistedReducer = persistReducer(persistConfig, newsReducer);

export const store = configureStore({
  reducer: {
    news: persistedReducer,
  },
});

export const persistor = persistStore(store);
