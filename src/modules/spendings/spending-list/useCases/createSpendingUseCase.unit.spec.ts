import InMemorySpendingRepository from 'modules/spendings/inMemory/InMemorySpendingRepository';
import CreateSpendingUseCase from './createSpendingUseCase';
import { InMemorySpendingFactory } from 'modules/spendings/inMemory/InMemorySpending';
import { SpendingCurrency } from 'modules/spendings/domain/Spending';

const spendingRepository = new InMemorySpendingRepository();

describe('CreateSpendingUseCase', () => {
    test('Test createing a spending, with valid spending information, expect spending to be created.', async () => {
        const spendingToCreate = new InMemorySpendingFactory().from({
            id: 0,
            description: 'x',
            amount: 1,
            currency: SpendingCurrency.HUF,
            spentAt: new Date().toISOString(),
        });

        const { spending } = await new CreateSpendingUseCase({
            spendingToCreate,
            spendingRepository,
        }).execute();

        expect(spending.id).toBeTruthy();
    });
});
