import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpendingCreationDTO, SpendingDTO } from 'modules/spendings';
import RemoteSpendingRepository from 'modules/spendings/remote/RemoteSpendingRepository';
import axiosInstance from 'remote/axiosInstance';
import CreateSpendingUseCase from '../../useCases/createSpendingUseCase';

const createSpendingThunk = createAsyncThunk<
    { spendingDTO: SpendingDTO },
    {
        spendingToCreate: SpendingCreationDTO;
        resetForm: () => void;
    },
    { rejectValue: string }
>(
    'spendingList/createSpendingThunk',
    async ({ spendingToCreate, resetForm }, thunkAPI) => {
        try {
            const { spending } = await new CreateSpendingUseCase({
                spendingRepository: new RemoteSpendingRepository(axiosInstance),
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
