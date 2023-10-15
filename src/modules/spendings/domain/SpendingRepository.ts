import Spending, { SpendingCurrency } from './Spending';

export enum SpendingOrdering {
    SPENT_AT_DESCENDING = '-spent_at',
    SPENT_AT_ASCENDING = 'spent_at',
    AMOUNT_DESCENDING = '-amount',
    AMOUNT_ASCENDING = 'amount',
}

export default interface SpendingRepository {
    listSpendings: (
        currency: SpendingCurrency | null,
        order: SpendingOrdering,
    ) => Promise<Spending[]>;
    create: (spending: Spending) => Promise<Spending>;
}
