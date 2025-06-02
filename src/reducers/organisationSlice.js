import { createSlice } from '@reduxjs/toolkit';

const organisationSlice = createSlice({
    name: 'organisation',
    initialState: { orgData: null, signUpData: null, orgTicket: null },
    reducers: {
        setOrg(state, action) {
            state.orgData = action.payload;
        },

        setSignUpData(state, action) {
            state.signUpData = action.payload;
        },

        setOrgTicket(state, action) {
            state.orgTicket = action.payload
        },

    },
});

export const { setOrg, setOrgTicket, setSignUpData } = organisationSlice.actions;
export default organisationSlice.reducer;
