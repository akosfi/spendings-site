import { configureStore } from '@reduxjs/toolkit';
import { spendingListReducer } from 'modules/spendings/spending-list';

export const store = configureStore({
    reducer: {
        spendingList: spendingListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
