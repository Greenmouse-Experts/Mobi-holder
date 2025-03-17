import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, ticket: null, paramsData: null },
    reducers: {
        setUser(state, action) {
            state.data = action.payload;
        },

        setTicket(state, action) {
            state.ticket = action.payload
        },

        setParamsData(state, action) {
            state.paramsData = action.payload;
        },
    },
});

export const { setUser, setTicket, setParamsData } = userSlice.actions;
export default userSlice.reducer;
