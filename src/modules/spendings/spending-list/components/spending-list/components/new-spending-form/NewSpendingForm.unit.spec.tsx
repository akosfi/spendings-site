import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import MockSpendingRepository, {
    mockListSpendings,
} from 'modules/spendings/mock/MockSpendingRepository';
import { createStore } from 'redux/store';
import NewSpendingForm from './NewSpendingForm';
import { SpendingCurrency, SpendingContextProvider } from 'modules/spendings';
import { MockSpendingFactory } from 'modules/spendings/mock/MockSpending';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('NewSpendingForm', () => {
    test('Test adding a new spending, with valid inputs, expect creation to be started.', async () => {
        const spendingToCreate = new MockSpendingFactory().from({
            id: 1,
            amount: 1000,
            description: 'Example description',
            spentAt: new Date().toISOString(),
            currency: SpendingCurrency.HUF,
        });
        mockListSpendings.mockResolvedValue([spendingToCreate]);
        const spendingRepository = MockSpendingRepository();
        const spendingFactory = new MockSpendingFactory();

        const store = createStore();

        render(
            <SpendingContextProvider
                spendingContextValue={{ spendingRepository, spendingFactory }}
            >
                <Provider store={store}>
                    <NewSpendingForm />
                </Provider>
            </SpendingContextProvider>,
        );

        await userEvent.type(
            screen.getByTestId('newSpendingForm/description'),
            spendingToCreate.description,
        );
        await userEvent.type(
            screen.getByTestId('newSpendingForm/amount'),
            String(spendingToCreate.amount),
        );

        await userEvent.click(screen.getByTestId('newSpendingForm/saveButton'));

        await waitFor(() =>
            expect(
                screen.getByTestId('newSpendingForm/description'),
            ).toHaveTextContent(''),
        );

        expect(store.getState().spendingList.spendings.length).toBe(1);
        expect(store.getState().spendingList.spendings[0].description).toBe(
            spendingToCreate.description,
        );
    });

    test('Test adding a new spending, with invalid inputs, expect creation not to be started.', async () => {
        const spendingRepository = MockSpendingRepository();
        const spendingFactory = new MockSpendingFactory();
        const store = createStore();

        render(
            <SpendingContextProvider
                spendingContextValue={{ spendingRepository, spendingFactory }}
            >
                <Provider store={store}>
                    <NewSpendingForm />
                </Provider>
            </SpendingContextProvider>,
        );

        await userEvent.click(screen.getByTestId('newSpendingForm/saveButton'));

        expect(store.getState().spendingList.spendings.length).not.toBeTruthy();
    });
});
