import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scorecardService from './scorecardService';

const initialState = {
    scores: [],
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
    extraReducers: (builder) => {
        builder
            .addCase(createScorecard.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(createScorecard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.scores.push(action.meta.arg.formData);
                // state.scores.push(action.payload);
            })
            .addCase(createScorecard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllScorecards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllScorecards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.scores = action.payload;
            })
            .addCase(getAllScorecards.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteScorecard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteScorecard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.scores = state.scores.filter(
                    (score) => score._id !== action.payload.id
                );
            })
            .addCase(deleteScorecard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const createScorecard = createAsyncThunk(
    'scorecard/create',
    async (scorecardData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await scorecardService.createScorecard(scorecardData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        };
    });

export const getAllScorecards = createAsyncThunk('scorecard/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await scorecardService.getAllScorecards(token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

export const deleteScorecard = createAsyncThunk(
    'scorecard/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await scorecardService.deleteScorecard(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        };
});



export const { reset } = scorecardSlice.actions;
export default scorecardSlice.reducer;