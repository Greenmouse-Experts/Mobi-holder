import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, paramsData: null },
    reducers: {
        setUser(state, action) {
            state.data = action.payload;
        },

        setParamsData(state, action) {
            state.paramsData = action.payload;
        },
    },
});

export const { setUser, setParamsData } = userSlice.actions;
export default userSlice.reducer;
