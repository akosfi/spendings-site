import { configureStore } from '@reduxjs/toolkit';
import { spendingListReducer } from 'modules/spendings/spending-list';

export const createStore = () =>
    configureStore({
        reducer: {
            spendingList: spendingListReducer,
        },
    });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
