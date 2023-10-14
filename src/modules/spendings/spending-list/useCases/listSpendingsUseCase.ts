import {
    Spending,
    SpendingCurrency,
    SpendingRepository,
} from 'modules/spendings';

interface ListSpendingUseCaseRequest {
    currency: SpendingCurrency;
    orderBy: 'spent_at' | '-spent_at' | 'amount' | '-amount';
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
