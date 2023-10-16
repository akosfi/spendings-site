import Spending, { SpendingDTO, SpendingFactory } from '../domain/Spending';

export default class RemoteSpending extends Spending {}

export class RemoteSpendingFactory implements SpendingFactory {
    from = (spendingDTO: SpendingDTO) => new RemoteSpending(spendingDTO);
}
