import SpendingRepository from '../domain/SpendingRepository';
import InMemorySpending, { InMemorySpendingFactory } from './InMemorySpending';

export default class InMemorySpendingRepository implements SpendingRepository {
    private spendings: InMemorySpending[] = [];

    constructor(initialSpendings: InMemorySpending[] = []) {
        this.spendings = initialSpendings;
    }

    create = async (spending: InMemorySpending) => {
        const savedSpending = new InMemorySpendingFactory().from({
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
