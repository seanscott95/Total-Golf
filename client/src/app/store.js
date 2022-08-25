import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../utils/auth/authSlice';
import scorecardReducer from '../utils/scorecard/scorecardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        scorecard: scorecardReducer,
    },
});