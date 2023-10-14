import { AxiosInstance, AxiosResponse } from 'axios';
import { SpendingCreationDTO, SpendingCurrency } from '../domain/Spending';
import SpendingRepository from '../domain/SpendingRepository';
import { RemoteSpendingFactory } from './RemoteSpending';

interface APISpendingDTO {
    id: number;
    description: string;
    amount: number;
    currency: SpendingCurrency;
    spent_at: string;
}

export default class RemoteSpendingRepository implements SpendingRepository {
    constructor(private readonly axiosInstance: AxiosInstance) {}

    create = async (spendingToCreate: SpendingCreationDTO) => {
        const { data: spending }: AxiosResponse<APISpendingDTO> =
            await this.axiosInstance.post('/spendings/', {
                description: spendingToCreate.description,
                amount: spendingToCreate.amount,
                currency: spendingToCreate.currency,
                spent_at: spendingToCreate.spentAt,
            });
        return new RemoteSpendingFactory().fromRemoteSpendingDTO(spending);
    };

    listSpendings = async (
        currency?: SpendingCurrency,
        orderBy?: 'amount' | 'spent_at' | '-spent_at' | '-amount',
    ) => {
        const urlSearchParams = new URLSearchParams();
        if (currency) {
            urlSearchParams.append('currency', currency);
        }
        if (orderBy) {
            urlSearchParams.append('orderBy', orderBy);
        }

        const { data: spendings }: AxiosResponse<APISpendingDTO[]> =
            await this.axiosInstance.get(
                `/spendings/?${urlSearchParams.toString()}`,
            );
        return spendings.map((apiSpendingDTO) =>
            new RemoteSpendingFactory().fromRemoteSpendingDTO(apiSpendingDTO),
        );
    };
}
