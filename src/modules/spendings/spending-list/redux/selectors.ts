import { createSelector } from '@reduxjs/toolkit';
import { SpendingFactory } from 'modules/spendings';
import { RootState } from 'redux/store';

const getState = (state: RootState) => state.spendingList;

const getSpendingDTOs = (state: RootState) => getState(state).spendings;

const getSpendings = createSelector(
    [getSpendingDTOs, (_, spendingFactory: SpendingFactory) => spendingFactory],
    (spendingDTOs, spendingFactory) =>
        spendingDTOs.map((spendingDTO) => spendingFactory.from(spendingDTO)),
);

const getIsLoading = (state: RootState) => getState(state).isLoading;

const getError = (state: RootState) => getState(state).error;

const getFilters = (state: RootState) => getState(state).filters;

const spendingListSelectors = {
    getSpendings,
    getIsLoading,
    getError,
    getFilters,
};

export default spendingListSelectors;
