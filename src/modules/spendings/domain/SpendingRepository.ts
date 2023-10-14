import Spending, { SpendingCreationDTO, SpendingCurrency } from './Spending';

export default interface SpendingRepository {
    listSpendings: (
        currency?: SpendingCurrency,
        orderBy?: 'spent_at' | '-spent_at' | 'amount' | '-amount',
    ) => Promise<Spending[]>;
    create: (spendingToCreate: SpendingCreationDTO) => Promise<Spending>;
}
