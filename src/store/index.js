import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../reducers/userSlice';
import orgReducer from '../reducers/organisationSlice';

export const store = configureStore({
    reducer: {
        userData: usersReducer,
        orgData: orgReducer
    },
});
