import {
    Spending,
    SpendingCurrency,
    SpendingOrdering,
    SpendingRepository,
} from 'modules/spendings';

interface CreateSpendingUseCaseRequest {
    spendingToCreate: Spending;
    spendingRepository: SpendingRepository;
    currentOrdering: SpendingOrdering;
    currentCurrency: SpendingCurrency | null;
}

interface CreateSpendingUseCaseResponse {
    spendings: Spending[];
}

export default class CreateSpendingUseCase {
    constructor(
        private readonly createSpendingUseCaseRequest: CreateSpendingUseCaseRequest,
    ) {}

    execute = async (): Promise<CreateSpendingUseCaseResponse> => {
        const {
            spendingRepository,
            spendingToCreate,
            currentCurrency,
            currentOrdering,
        } = this.createSpendingUseCaseRequest;
        await spendingRepository.create(spendingToCreate);
        const spendings = await spendingRepository.listSpendings(
            currentCurrency,
            currentOrdering,
        );
        return { spendings };
    };
}
