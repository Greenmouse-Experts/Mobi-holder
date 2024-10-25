import { createSlice } from '@reduxjs/toolkit';

const organisationSlice = createSlice({
    name: 'organisation',
    initialState: { orgData: null },
    reducers: {
        setOrg(state, action) {
            state.orgData = action.payload;
        },
    },
});

export const { setOrg } = organisationSlice.actions;
export default organisationSlice.reducer;
