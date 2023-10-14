import Spending from 'modules/spendings/domain/Spending';

interface MoneyFormatter {
    format: (spending: Spending) => string;
}

class DollarFormatter implements MoneyFormatter {
    format = (spending: Spending) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(spending.amount);
}

class HUFFormatter implements MoneyFormatter {
    format = (spending: Spending) =>
        new Intl.NumberFormat('hu-HU', {
            style: 'currency',
            currency: 'HUF',
        }).format(spending.amount);
}

class UnknownCurrencyFormatter implements MoneyFormatter {
    format = (spending: Spending) =>
        `Unknown currency. Amount:${spending.amount}`;
}

export default class MoneyFormatterFactory {
    getFormatter = (spending: Spending) => {
        if (spending.currency === 'HUF') {
            return new HUFFormatter();
        }
        if (spending.currency === 'USD') {
            return new DollarFormatter();
        }
        return new UnknownCurrencyFormatter();
    };
}
