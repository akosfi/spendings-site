import Spending, { SpendingDTO, SpendingFactory } from '../domain/Spending';

export default class MockedSpending extends Spending {}

export class MockedSpendingFactory implements SpendingFactory {
    from = (spendingDTO: SpendingDTO) => new MockedSpending(spendingDTO);
}
