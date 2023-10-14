import { AxiosInstance, AxiosResponse } from 'axios';
import Spending, { SpendingCurrency } from '../domain/Spending';
import SpendingRepository, {
    SpendingOrdering,
} from '../domain/SpendingRepository';
import { RemoteSpendingDTO, RemoteSpendingFactory } from './RemoteSpending';

export default class RemoteSpendingRepository implements SpendingRepository {
    constructor(private readonly axiosInstance: AxiosInstance) {}

    create = async (spending: Spending) => {
        const { data: createdSpending }: AxiosResponse<RemoteSpendingDTO> =
            await this.axiosInstance.post('/spendings/', {
                description: spending.description,
                amount: spending.amount,
                currency: spending.currency,
                spent_at: spending.spentAt,
            });
        return new RemoteSpendingFactory().fromRemoteSpendingDTO(
            createdSpending,
        );
    };

    listSpendings = async (
        currency?: SpendingCurrency,
        order?: SpendingOrdering,
    ) => {
        const urlSearchParams = new URLSearchParams();
        if (currency) {
            urlSearchParams.append('currency', currency);
        }
        if (order) {
            urlSearchParams.append('order', order);
        }

        const { data: spendings }: AxiosResponse<RemoteSpendingDTO[]> =
            await this.axiosInstance.get(
                `/spendings/?${urlSearchParams.toString()}`,
            );
        return spendings.map((apiSpendingDTO) =>
            new RemoteSpendingFactory().fromRemoteSpendingDTO(apiSpendingDTO),
        );
    };
}
