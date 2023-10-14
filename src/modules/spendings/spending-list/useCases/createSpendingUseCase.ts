import {
    Spending,
    SpendingCreationDTO,
    SpendingRepository,
} from 'modules/spendings';

interface CreateSpendingUseCaseRequest {
    spendingToCreate: SpendingCreationDTO;
    spendingRepository: SpendingRepository;
}

interface CreateSpendingUseCaseResponse {
    spending: Spending;
}

export default class CreateSpendingUseCase {
    constructor(
        private readonly createSpendingUseCaseRequest: CreateSpendingUseCaseRequest,
    ) {}

    execute = async (): Promise<CreateSpendingUseCaseResponse> => {
        const { spendingRepository, spendingToCreate } =
            this.createSpendingUseCaseRequest;
        const spending = await spendingRepository.create(spendingToCreate);
        return { spending };
    };
}
