import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    SpendingCurrency,
    SpendingDTO,
    SpendingOrdering,
} from 'modules/spendings';
import listSpendingsThunk from './thunks/listSpendingsThunk';
import createSpendingThunk from './thunks/createSpendingThunk';

interface SpeningListState {
    spendings: SpendingDTO[];
    isLoading: boolean;
    error?: string;
    filters: {
        currency: SpendingCurrency | null;
        ordering: SpendingOrdering;
    };
}

const initialState: SpeningListState = {
    spendings: [],
    isLoading: false,
    error: undefined,
    filters: {
        currency: null,
        ordering: SpendingOrdering.SPENT_AT_DESCENDING,
    },
};

const speningListSlice = createSlice({
    name: 'speningListSlice',
    initialState,
    reducers: {
        setCurrencyFilter(
            state,
            {
                payload: { currency },
            }: PayloadAction<{ currency: SpendingCurrency | null }>,
        ) {
            state.filters.currency = currency;
        },
        setOrderingFilter(
            state,
            {
                payload: { ordering },
            }: PayloadAction<{ ordering: SpendingOrdering }>,
        ) {
            state.filters.ordering = ordering;
        },
    },
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
                    payload: { spendingDTOs },
                }: PayloadAction<{ spendingDTOs: SpendingDTO[] }>,
            ) => {
                state.spendings = spendingDTOs;
                state.isLoading = false;
            },
        );

        builder.addCase(createSpendingThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

export const { actions: spendingListActions } = speningListSlice;

export default speningListSlice.reducer;
