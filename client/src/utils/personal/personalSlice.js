import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import personalService from './personalService';

const initialState = {
    personal: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const personalSlice = createSlice({
    name: 'personal',
    initialState,
    reducers: {
        resetPersonal: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPersonal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPersonal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.personal = action.payload;
            })
            .addCase(getAllPersonal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const getAllPersonal = createAsyncThunk(
    'personal/getUsersScores',
    async (name, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await personalService.getAllPersonal(name, token);
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


export const { resetPersonal } = personalSlice.actions;
export default personalSlice.reducer;