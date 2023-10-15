import {
    queryByTestId,
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import SpendingContext from 'modules/spendings/context/SpendingProvider';
import { InMemorySpendingFactory } from 'modules/spendings/inMemory/InMemorySpending';
import InMemorySpendingRepository from 'modules/spendings/inMemory/InMemorySpendingRepository';
import { store } from 'redux/store';
import List from './List';
import { SpendingDTO, SpendingCurrency } from 'modules/spendings';

const spendingDTO: SpendingDTO = {
    id: 1,
    description: 'Example description',
    amount: 10,
    currency: SpendingCurrency.USD,
    spentAt: new Date().toISOString(),
};

const spending1 = new InMemorySpendingFactory().from({
    ...spendingDTO,
    id: 1,
    description: 'First description',
});

const spending2 = new InMemorySpendingFactory().from({
    ...spendingDTO,
    id: 2,
    description: 'Second description',
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('List', () => {
    test('Test displaying spendings, with existing spendings in storage, expect spending to be visible.', async () => {
        const spendingRepository = new InMemorySpendingRepository([
            spending1,
            spending2,
        ]);
        const spendingFactory = new InMemorySpendingFactory();
        render(
            <SpendingContext
                spendingContextValue={{ spendingFactory, spendingRepository }}
            >
                <Provider store={store}>
                    <List />
                </Provider>
            </SpendingContext>,
        );

        await waitForElementToBeRemoved(() =>
            queryByTestId(screen.getByTestId('List/container'), 'List/spinner'),
        );

        expect(screen.getByText(spending1.description)).toBeVisible();
        expect(screen.getByText(spending2.description)).toBeVisible();
        expect(
            (await screen.findAllByTestId('ListItem/description')).length,
        ).toBe(2);
    });

    test('Test displaying spendings, with zero spendings in storage, expect no spending to be visible.', async () => {
        const spendingRepository = new InMemorySpendingRepository();
        const spendingFactory = new InMemorySpendingFactory();
        render(
            <SpendingContext
                spendingContextValue={{ spendingFactory, spendingRepository }}
            >
                <Provider store={store}>
                    <List />
                </Provider>
            </SpendingContext>,
        );

        await waitForElementToBeRemoved(() =>
            queryByTestId(screen.getByTestId('List/container'), 'List/spinner'),
        );

        expect(() => screen.getByTestId('ListItem/description')).toThrow();
    });
});
