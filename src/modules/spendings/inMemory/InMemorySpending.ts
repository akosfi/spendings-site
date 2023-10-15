import Spending, { SpendingDTO, SpendingFactory } from '../domain/Spending';

export default class InMemorySpending extends Spending {}

export class InMemorySpendingFactory implements SpendingFactory {
    from = (spendingDTO: SpendingDTO) => new InMemorySpending(spendingDTO);
}
