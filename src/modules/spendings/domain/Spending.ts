export enum SpendingCurrency {
    HUF = 'HUF',
    USD = 'USD',
}

export interface SpendingDTO {
    id: number;
    description: string;
    amount: number;
    currency: SpendingCurrency;
    spentAt: string;
}

export interface SpendingCreationDTO
    extends Pick<
        SpendingDTO,
        'amount' | 'currency' | 'description' | 'spentAt'
    > {}

export default class Spending implements SpendingDTO {
    id: number;
    description: string;
    amount: number;
    currency: SpendingCurrency;
    spentAt: string;

    constructor({ id, description, amount, currency, spentAt }: SpendingDTO) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.spentAt = spentAt;
    }

    serialize = (): SpendingDTO => ({
        id: this.id,
        description: this.description,
        amount: this.amount,
        currency: this.currency,
        spentAt: this.spentAt,
    });
}

export interface SpendingFactory {
    from: (spendingDTO: SpendingDTO) => Spending;
}
