import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const scorecardSlice = createSlice({
    name: 'scorecard',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
});

export const { reset } = scorecardSlice.actions;
export default scorecardSlice.reducer;