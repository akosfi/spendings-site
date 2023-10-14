import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpendingCurrency, SpendingDTO } from 'modules/spendings';
import ListSpendingUseCase from '../../useCases/listSpendingsUseCase';
import RemoteSpendingRepository from 'modules/spendings/remote/RemoteSpendingRepository';
import axiosInstance from 'remote/axiosInstance';

const listSpendingsThunk = createAsyncThunk<
    { spendingDTOs: SpendingDTO[] },
    {
        currency?: SpendingCurrency;
        orderBy?: 'spent_at' | '-spent_at' | 'amount' | '-amount';
    },
    { rejectValue: string }
>(
    'spendingList/listSpendingsThunk',
    async ({ orderBy, currency }, thunkAPI) => {
        try {
            const { spendings } = await new ListSpendingUseCase({
                spendingRepository: new RemoteSpendingRepository(axiosInstance),
                orderBy,
                currency,
            }).execute();
            return {
                spendingDTOs: spendings.map((spending) => spending.serialize()),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to list spendings.');
        }
    },
);

export default listSpendingsThunk;
