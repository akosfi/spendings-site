import {
    queryByTestId,
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import MockSpendingRepository, {
    mockListSpendings,
} from 'modules/spendings/mock/MockSpendingRepository';
import List from './List';
import { SpendingContextProvider, SpendingCurrency } from 'modules/spendings';
import { createStore } from 'redux/store';
import { MockSpendingFactory } from 'modules/spendings/mock/MockSpending';

const spending1 = new MockSpendingFactory().from({
    amount: 10,
    currency: SpendingCurrency.USD,
    spentAt: new Date().toISOString(),
    id: 1,
    description: 'First description',
});

const spending2 = new MockSpendingFactory().from({
    amount: 10,
    currency: SpendingCurrency.USD,
    spentAt: new Date().toISOString(),
    id: 2,
    description: 'Second description',
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('List', () => {
    test('Test displaying spendings, with existing spendings in storage, expect spending to be visible.', async () => {
        mockListSpendings.mockResolvedValue([spending1, spending2]);
        const spendingFactory = new MockSpendingFactory();
        const spendingRepository = MockSpendingRepository();
        const store = createStore();

        render(
            <SpendingContextProvider
                spendingContextValue={{ spendingRepository, spendingFactory }}
            >
                <Provider store={store}>
                    <List />
                </Provider>
            </SpendingContextProvider>,
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
        mockListSpendings.mockResolvedValue([]);
        const spendingRepository = MockSpendingRepository();
        const spendingFactory = new MockSpendingFactory();
        const store = createStore();
        render(
            <SpendingContextProvider
                spendingContextValue={{ spendingRepository, spendingFactory }}
            >
                <Provider store={store}>
                    <List />
                </Provider>
            </SpendingContextProvider>,
        );

        await waitForElementToBeRemoved(() =>
            queryByTestId(screen.getByTestId('List/container'), 'List/spinner'),
        );

        expect(() => screen.getByTestId('ListItem/description')).toThrow();
    });
});
