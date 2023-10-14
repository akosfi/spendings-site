import Spending, { SpendingCurrency } from './Spending';

export enum SpendingOrdering {
    DATE_DESCENDING = '-date',
    DATE_ASCENDING = 'date',
    AMOUNT_DESCENDING = '-amount',
    AMOUNT_ASCENDING = 'amount',
}

export default interface SpendingRepository {
    listSpendings: (
        currency?: SpendingCurrency,
        orderBy?: SpendingOrdering,
    ) => Promise<Spending[]>;
    create: (spending: Spending) => Promise<Spending>;
}
