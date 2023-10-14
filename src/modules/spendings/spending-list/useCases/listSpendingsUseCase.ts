import {
    Spending,
    SpendingCurrency,
    SpendingRepository,
} from 'modules/spendings';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';

interface ListSpendingUseCaseRequest {
    currency?: SpendingCurrency;
    orderBy?: SpendingOrdering;
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
        const { spendingRepository, currency, orderBy } =
            this.listSpendingUseCaseRequest;
        const spendings = await spendingRepository.listSpendings(
            currency,
            orderBy,
        );
        return { spendings };
    };
}
