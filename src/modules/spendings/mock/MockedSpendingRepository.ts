import SpendingRepository from '../domain/SpendingRepository';
import MockedSpending, { MockedSpendingFactory } from './MockSpending';

export default class MockedSpendingRepository implements SpendingRepository {
    private spendings: MockedSpending[] = [];

    constructor(initialSpendings: MockedSpending[] = []) {
        this.spendings = initialSpendings;
    }

    create = async (spending: MockedSpending) => {
        const savedSpending = new MockedSpendingFactory().from({
            ...spending.serialize(),
            id: Math.floor(Math.random() * 1000000 + 1),
        });
        this.spendings.push(savedSpending);
        return savedSpending;
    };

    listSpendings = async () => {
        return this.spendings;
    };
}
