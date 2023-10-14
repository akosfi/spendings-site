import Spending, { SpendingCurrency } from './Spending';

export enum SpendingOrdering {
    SPENT_AT_DESCENDING = '-date',
    SPENT_AT_ASCENDING = 'date',
    AMOUNT_DESCENDING = '-amount',
    AMOUNT_ASCENDING = 'amount',
}

export default interface SpendingRepository {
    listSpendings: (
        currency?: SpendingCurrency,
        order?: SpendingOrdering,
    ) => Promise<Spending[]>;
    create: (spending: Spending) => Promise<Spending>;
}
