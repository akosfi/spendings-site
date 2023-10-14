import { Spending, SpendingCurrency, SpendingDTO } from 'modules/spendings';
import { RemoteSpendingFactory } from 'modules/spendings/remote/RemoteSpending';
import MoneyFormatterFactory from './MoneyFormatter';

const spendingDTO: SpendingDTO = {
    id: 1,
    description: '',
    amount: 10,
    currency: SpendingCurrency.USD,
    spentAt: '',
};

describe('MoneyFormatter', () => {
    test.each([
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10,
                currency: SpendingCurrency.USD,
            }),
            '$10.00',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 1000,
                currency: SpendingCurrency.USD,
            }),
            '$1,000.00',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10.1,
                currency: SpendingCurrency.USD,
            }),
            '$10.10',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 1000.1,
                currency: SpendingCurrency.USD,
            }),
            '$1,000.10',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10,
                currency: SpendingCurrency.HUF,
            }),
            '10,00\xa0Ft',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10000,
                currency: SpendingCurrency.HUF,
            }),
            '10\xa0000,00\xa0Ft',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 99,
                currency: SpendingCurrency.HUF,
            }),
            '99,00\xa0Ft',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10000000,
                currency: SpendingCurrency.HUF,
            }),
            '10\xa0000\xa0000,00\xa0Ft',
        ],
    ])(
        'Test formatting money, with valid currency and amount (%p), expect correct format to be seen (%p).',
        (spending: Spending, formattedMoney: string) => {
            expect(
                new MoneyFormatterFactory()
                    .getFormatter(spending)
                    .format(spending),
            ).toBe(formattedMoney);
        },
    );

    /*The casting below is not nice! Altough there were some results from
     the API that were not HUF or USD. So we are testing the functionality 
     in those cases. */

    test.each([
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10,
                currency: 'EUR' as SpendingCurrency,
            }),
            'Unknown currency. Amount:10',
        ],
        [
            new RemoteSpendingFactory().from({
                ...spendingDTO,
                amount: 10000000,
                currency: 'EUR' as SpendingCurrency,
            }),
            'Unknown currency. Amount:10000000',
        ],
    ])(
        'Test formatting money, with invalid currency (%p), expect test notifying about unknwon currency to be seen. (%p).',
        (spending: Spending, formattedMoney: string) => {
            expect(
                new MoneyFormatterFactory()
                    .getFormatter(spending)
                    .format(spending),
            ).toBe(formattedMoney);
        },
    );
});
