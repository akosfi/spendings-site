import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import SpendingContext from 'modules/spendings/context/SpendingProvider';
import { InMemorySpendingFactory } from 'modules/spendings/inMemory/InMemorySpending';
import InMemorySpendingRepository from 'modules/spendings/inMemory/InMemorySpendingRepository';
import { store } from 'redux/store';
import NewSpendingForm from './NewSpendingForm';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('NewSpendingForm', () => {
    test('Test adding a new spending, with valid inputs, expect creation to be started.', async () => {
        const spendingRepository = new InMemorySpendingRepository();
        const spendingFactory = new InMemorySpendingFactory();

        const spiedSpendingRepositoryCreate = jest.spyOn(
            spendingRepository,
            'create',
        );

        render(
            <SpendingContext
                spendingContextValue={{ spendingFactory, spendingRepository }}
            >
                <Provider store={store}>
                    <NewSpendingForm />
                </Provider>
            </SpendingContext>,
        );

        await userEvent.type(
            screen.getByTestId('newSpendingForm/description'),
            'Example description',
        );
        await userEvent.type(
            screen.getByTestId('newSpendingForm/amount'),
            '1000',
        );

        await userEvent.click(screen.getByTestId('newSpendingForm/saveButton'));

        expect(spiedSpendingRepositoryCreate).toHaveBeenCalled();
    });

    test('Test adding a new spending, with invalid inputs, expect creation not to be started.', async () => {
        const spendingRepository = new InMemorySpendingRepository();
        const spendingFactory = new InMemorySpendingFactory();
        render(
            <SpendingContext
                spendingContextValue={{ spendingFactory, spendingRepository }}
            >
                <Provider store={store}>
                    <NewSpendingForm />
                </Provider>
            </SpendingContext>,
        );

        const spiedSpendingRepositoryCreate = jest.spyOn(
            spendingRepository,
            'create',
        );

        await userEvent.click(screen.getByTestId('newSpendingForm/saveButton'));

        expect(spiedSpendingRepositoryCreate).not.toHaveBeenCalled();
    });
});
