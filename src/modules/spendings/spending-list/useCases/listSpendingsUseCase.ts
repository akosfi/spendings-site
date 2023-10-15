import {
    Spending,
    SpendingCurrency,
    SpendingRepository,
} from 'modules/spendings';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';

interface ListSpendingUseCaseRequest {
    currency: SpendingCurrency | null;
    order: SpendingOrdering;
    spendingRepository: SpendingRepository;
}

interface ListSpendingUseCaseResponse {
    spendings: Spending[];
}

export default class ListSpendingUseCase {
    constructor(
        private readonly listSpendingUseCaseRequest: ListSpendingUseCaseRequest,
    ) {}

    execute = async (): Promise<ListSpendingUseCaseResponse> => {
        const { spendingRepository, currency, order } =
            this.listSpendingUseCaseRequest;
        const spendings = await spendingRepository.listSpendings(
            currency,
            order,
        );
        return { spendings };
    };
}
