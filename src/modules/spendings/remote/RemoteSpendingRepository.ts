import { AxiosInstance, AxiosResponse } from 'axios';
import Spending, {
    SpendingCurrency,
    SpendingDTO,
    SpendingFactory,
} from '../domain/Spending';
import SpendingRepository, {
    SpendingOrdering,
} from '../domain/SpendingRepository';

export interface APISpendingDTO extends Omit<SpendingDTO, 'spentAt'> {
    spent_at: string;
}

export default class RemoteSpendingRepository implements SpendingRepository {
    constructor(private readonly axiosInstance: AxiosInstance) {}

    create = async (spending: Spending) => {
        const {
            data: { id, amount, description, currency, spent_at },
        }: AxiosResponse<APISpendingDTO> = await this.axiosInstance.post(
            '/spendings/',
            {
                description: spending.description,
                amount: spending.amount,
                currency: spending.currency,
                spent_at: spending.spentAt,
            },
        );
        return new SpendingFactory().from({
            id,
            amount,
            description,
            currency,
            spentAt: spent_at,
        });
    };

    listSpendings = async (
        currency: SpendingCurrency | null,
        order: SpendingOrdering,
    ) => {
        const urlSearchParams = new URLSearchParams();
        if (currency) {
            urlSearchParams.append('currency', currency);
        }

        urlSearchParams.append('order', order);

        const { data: spendings }: AxiosResponse<APISpendingDTO[]> =
            await this.axiosInstance.get(
                `/spendings/?${urlSearchParams.toString()}`,
            );
        return spendings.map(
            ({ id, amount, description, currency, spent_at }) =>
                new SpendingFactory().from({
                    id,
                    amount,
                    description,
                    currency,
                    spentAt: spent_at,
                }),
        );
    };
}
