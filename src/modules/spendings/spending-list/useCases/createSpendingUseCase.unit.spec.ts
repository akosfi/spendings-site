import InMemorySpendingRepository from 'modules/spendings/inMemory/InMemorySpendingRepository';
import CreateSpendingUseCase from './createSpendingUseCase';
import { InMemorySpendingFactory } from 'modules/spendings/inMemory/InMemorySpending';
import { SpendingCurrency } from 'modules/spendings/domain/Spending';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';

const spendingRepository = new InMemorySpendingRepository();

describe('CreateSpendingUseCase', () => {
    test('Test createing a spending, with valid spending information, expect spending to be created.', async () => {
        const spendingToCreate = new InMemorySpendingFactory().from({
            id: 0,
            description: 'New spending',
            amount: 1,
            currency: SpendingCurrency.HUF,
            spentAt: new Date().toISOString(),
        });

        const { spendings } = await new CreateSpendingUseCase({
            spendingToCreate,
            spendingRepository,
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
