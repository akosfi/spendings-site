import { createAsyncThunk } from '@reduxjs/toolkit';
import { Spending, SpendingDTO, SpendingRepository } from 'modules/spendings';
import CreateSpendingUseCase from '../../useCases/createSpendingUseCase';
import spendingListSelectors from '../selectors';
import { RootState } from 'redux/store';

const createSpendingThunk = createAsyncThunk<
    { spendingDTOs: SpendingDTO[] },
    {
        spendingRepository: SpendingRepository;
        spendingToCreate: Spending;
        resetForm: () => void;
    },
    { rejectValue: string; state: RootState }
>(
    'spendingList/createSpendingThunk',
    async ({ spendingRepository, spendingToCreate, resetForm }, thunkAPI) => {
        try {
            const filters = spendingListSelectors.getFilters(
                thunkAPI.getState(),
            );
            const { spendings } = await new CreateSpendingUseCase({
                spendingRepository,
                spendingToCreate,
                currentCurrency: filters.currency,
                currentOrdering: filters.ordering,
            }).execute();
            resetForm();
            return {
                spendingDTOs: spendings.map(({ serialize }) => serialize()),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to create spending.');
        }
    },
);

export default createSpendingThunk;
