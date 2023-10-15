import { SpendingCurrency } from 'modules/spendings';
import { InMemorySpendingFactory } from 'modules/spendings/inMemory/InMemorySpending';
import InMemorySpendingRepository from 'modules/spendings/inMemory/InMemorySpendingRepository';
import ListSpendingUseCase from './listSpendingsUseCase';

const spending1 = new InMemorySpendingFactory().from({
    id: 1,
    description: 'x1',
    amount: 10,
    currency: SpendingCurrency.USD,
    spentAt: 'x',
});

const spending2 = new InMemorySpendingFactory().from({
    id: 2,
    description: 'x2',
    amount: 100,
    currency: SpendingCurrency.HUF,
    spentAt: 'x',
});

const spendingRepository = new InMemorySpendingRepository([
    spending1,
    spending2,
]);

describe('ListSpendingsUseCase', () => {
    test('Test listing spendings, with already existing spendings, expect spendings to be returned.', async () => {
        const { spendings } = await new ListSpendingUseCase({
            spendingRepository,
        }).execute();
        expect(spendings).toEqual([spending1, spending2]);
    });
});
