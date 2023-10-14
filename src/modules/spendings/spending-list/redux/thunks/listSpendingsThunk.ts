import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpendingCurrency, SpendingDTO } from 'modules/spendings';
import ListSpendingUseCase from '../../useCases/listSpendingsUseCase';
import RemoteSpendingRepository from 'modules/spendings/remote/RemoteSpendingRepository';
import axiosInstance from 'remote/axiosInstance';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';

const listSpendingsThunk = createAsyncThunk<
    { spendingDTOs: SpendingDTO[] },
    {
        currency?: SpendingCurrency;
        order?: SpendingOrdering;
    },
    { rejectValue: string }
>('spendingList/listSpendingsThunk', async ({ order, currency }, thunkAPI) => {
    try {
        const { spendings } = await new ListSpendingUseCase({
            spendingRepository: new RemoteSpendingRepository(axiosInstance),
            order,
            currency,
        }).execute();
        return {
            spendingDTOs: spendings.map((spending) => spending.serialize()),
        };
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to list spendings.');
    }
});

export default listSpendingsThunk;
