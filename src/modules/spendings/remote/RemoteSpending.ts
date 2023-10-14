import Spending, { SpendingDTO, SpendingFactory } from '../domain/Spending';

export interface RemoteSpendingDTO extends Omit<SpendingDTO, 'spentAt'> {
    spent_at: string;
}

export default class RemoteSpending extends Spending {}

export class RemoteSpendingFactory implements SpendingFactory {
    from = (spendingDTO: SpendingDTO) => new RemoteSpending(spendingDTO);
    fromRemoteSpendingDTO = (remoteSpendingDTO: RemoteSpendingDTO) =>
        new RemoteSpending({
            ...remoteSpendingDTO,
            spentAt: remoteSpendingDTO.spent_at,
        });
}
