import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SpendingDTO } from 'modules/spendings/domain/Spending';
import listSpendingsThunk from './thunks/listSpendingsThunk';
import createSpendingThunk from './thunks/createSpendingThunk';

interface SpeningListState {
    spendings: SpendingDTO[];
    isLoading: boolean;
    error?: string;
}

const initialState: SpeningListState = {
    spendings: [],
    isLoading: false,
    error: undefined,
};

const speningListSlice = createSlice({
    name: 'speningListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listSpendingsThunk.pending, (state) => {
            state.spendings = [];
            state.isLoading = true;
            state.error = undefined;
        });

        builder.addCase(
            listSpendingsThunk.fulfilled,
            (
                state,
                {
                    payload: { spendingDTOs },
                }: PayloadAction<{ spendingDTOs: SpendingDTO[] }>,
            ) => {
                state.spendings = spendingDTOs;
                state.isLoading = false;
            },
        );

        builder.addCase(listSpendingsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(createSpendingThunk.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });

        builder.addCase(
            createSpendingThunk.fulfilled,
            (
                state,
                {
                    payload: { spendingDTO },
                }: PayloadAction<{ spendingDTO: SpendingDTO }>,
            ) => {
                state.spendings = [...state.spendings, spendingDTO];
                state.isLoading = false;
            },
        );

        builder.addCase(createSpendingThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

export default speningListSlice.reducer;
