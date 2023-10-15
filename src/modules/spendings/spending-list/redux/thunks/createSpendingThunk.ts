import { createAsyncThunk } from '@reduxjs/toolkit';
import { Spending, SpendingDTO, SpendingRepository } from 'modules/spendings';
import CreateSpendingUseCase from '../../useCases/createSpendingUseCase';

const createSpendingThunk = createAsyncThunk<
    { spendingDTO: SpendingDTO },
    {
        spendingRepository: SpendingRepository;
        spendingToCreate: Spending;
        resetForm: () => void;
    },
    { rejectValue: string }
>(
    'spendingList/createSpendingThunk',
    async ({ spendingRepository, spendingToCreate, resetForm }, thunkAPI) => {
        try {
            const { spending } = await new CreateSpendingUseCase({
                spendingRepository,
                spendingToCreate,
            }).execute();
            resetForm();
            return { spendingDTO: spending.serialize() };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to create spending.');
        }
    },
);

export default createSpendingThunk;
