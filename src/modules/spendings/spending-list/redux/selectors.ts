import { createSelector } from '@reduxjs/toolkit';
import { RemoteSpendingFactory } from 'modules/spendings/remote/RemoteSpending';
import { RootState } from 'redux/store';

const getState = (state: RootState) => state.spendingList;

const getSpendingDTOs = (state: RootState) => getState(state).spendings;

const getSpendings = createSelector(getSpendingDTOs, (spendingDTOs) =>
    spendingDTOs.map((spendingDTO) =>
        new RemoteSpendingFactory().from(spendingDTO),
    ),
);

const getIsLoading = (state: RootState) => getState(state).isLoading;

const getError = (state: RootState) => getState(state).error;

const spendingListSelectors = {
    getSpendings,
    getIsLoading,
    getError,
};

export default spendingListSelectors;
