import MockSpendingRepository, {
    mockListSpendings,
} from 'modules/spendings/mock/MockSpendingRepository';
import CreateSpendingUseCase from './createSpendingUseCase';
import { SpendingCurrency, SpendingOrdering } from 'modules/spendings';
import { MockSpendingFactory } from 'modules/spendings/mock/MockSpending';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('CreateSpendingUseCase', () => {
    test('Test creating a spending, with valid spending information, expect spending to be created.', async () => {
        const spendingToCreate = new MockSpendingFactory().from({
            id: 0,
            description: 'New spending',
            amount: 1,
            currency: SpendingCurrency.HUF,
            spentAt: new Date().toISOString(),
        });

        mockListSpendings.mockResolvedValue([spendingToCreate]);

        const { spendings } = await new CreateSpendingUseCase({
            spendingToCreate,
            spendingRepository: MockSpendingRepository(),
            currentCurrency: SpendingCurrency.HUF,
            currentOrdering: SpendingOrdering.AMOUNT_DESCENDING,
        }).execute();

        expect(
            spendings.find(
                (spending) =>
                    spending.description === spendingToCreate.description &&
                    spending.spentAt === spendingToCreate.spentAt,
            ),
        ).toBeTruthy();
    });
});
