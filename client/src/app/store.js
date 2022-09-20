import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../utils/auth/authSlice';
import scorecardReducer from '../utils/scorecard/scorecardSlice';
import personalReducer from '../utils/personal/personalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        scores: scorecardReducer,
        personal: personalReducer,
    },
});