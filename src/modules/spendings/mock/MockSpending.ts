import Spending, { SpendingDTO, SpendingFactory } from '../domain/Spending';

const MockSpending = jest.fn<Spending, [SpendingDTO]>(
    (spendingDTO: SpendingDTO) => ({
        id: spendingDTO.id,
        amount: spendingDTO.amount,
        currency: spendingDTO.currency,
        spentAt: spendingDTO.spentAt,
        description: spendingDTO.description,
        serialize: () => spendingDTO,
    }),
);

export class MockSpendingFactory implements SpendingFactory {
    from = (spendingDTO: SpendingDTO) => MockSpending(spendingDTO);
}

export default MockSpending;
