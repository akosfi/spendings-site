import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    SpendingCurrency,
    SpendingDTO,
    SpendingOrdering,
    SpendingRepository,
} from 'modules/spendings';
import ListSpendingUseCase from '../../useCases/listSpendingsUseCase';

const listSpendingsThunk = createAsyncThunk<
    { spendingDTOs: SpendingDTO[] },
    {
        spendingRepository: SpendingRepository;
        currency?: SpendingCurrency;
        order?: SpendingOrdering;
    },
    { rejectValue: string }
>(
    'spendingList/listSpendingsThunk',
    async ({ order, currency, spendingRepository }, thunkAPI) => {
        try {
            const { spendings } = await new ListSpendingUseCase({
                spendingRepository,
                order,
                currency,
            }).execute();
            return {
                spendingDTOs: spendings.map((spending) => spending.serialize()),
            };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('Failed to list spendings.');
        }
    },
);

export default listSpendingsThunk;
