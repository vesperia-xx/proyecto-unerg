import { configureStore } from '@reduxjs/toolkit';
import { studentSlice } from './slices/studentSlice';
import { authSlice } from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { pasantiasSlice } from './slices/pasantiasSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  student: studentSlice.reducer,
  auth: authSlice.reducer,
  pasantias: pasantiasSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
