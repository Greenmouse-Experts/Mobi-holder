import { createSlice } from '@reduxjs/toolkit';

const organisationSlice = createSlice({
    name: 'organisation',
    initialState: { orgData: null, orgTicket: null },
    reducers: {
        setOrg(state, action) {
            state.orgData = action.payload;
        },

        setOrgTicket(state, action) {
            state.orgTicket = action.payload
        },

    },
});

export const { setOrg, setOrgTicket } = organisationSlice.actions;
export default organisationSlice.reducer;
