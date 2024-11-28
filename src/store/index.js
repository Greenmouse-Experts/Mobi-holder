import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import usersReducer from '../reducers/userSlice';
import orgReducer from '../reducers/organisationSlice';

const persistConfig = {
    key: 'root', // Key for the persisted data in storage
    storage,      // Storage method (localStorage)
};

const rootReducer = combineReducers({
    userData: usersReducer,
    orgData: orgReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
