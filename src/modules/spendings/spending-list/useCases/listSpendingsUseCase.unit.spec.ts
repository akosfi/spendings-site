import { SpendingCurrency, SpendingOrdering } from 'modules/spendings';
import MockSpendingRepository, {
    mockListSpendings,
} from 'modules/spendings/mock/MockSpendingRepository';
import ListSpendingUseCase from './listSpendingsUseCase';
import { MockSpendingFactory } from 'modules/spendings/mock/MockSpending';

const spending1 = new MockSpendingFactory().from({
    id: 1,
    description: 'x1',
    amount: 10,
    currency: SpendingCurrency.USD,
    spentAt: 'x',
});

const spending2 = new MockSpendingFactory().from({
    id: 2,
    description: 'x2',
    amount: 100,
    currency: SpendingCurrency.HUF,
    spentAt: 'x',
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ListSpendingsUseCase', () => {
    test('Test listing spendings, with already existing spendings, expect spendings to be returned.', async () => {
        mockListSpendings.mockResolvedValue([spending1, spending2]);

        const { spendings } = await new ListSpendingUseCase({
            spendingRepository: MockSpendingRepository(),
            order: SpendingOrdering.SPENT_AT_DESCENDING,
            currency: null,
        }).execute();
        expect(spendings).toEqual([spending1, spending2]);
    });
});
