import Spending from '../domain/Spending';
import SpendingRepository from '../domain/SpendingRepository';

export const mockListSpendings = jest.fn(
    (): Promise<Spending[]> => Promise.resolve<Spending[]>([]),
);
export const mockCreate = jest.fn((spending) => Promise.resolve(spending));

const MockSpendingRepository = jest.fn<SpendingRepository, undefined[]>(() => ({
    listSpendings: mockListSpendings,
    create: mockCreate,
}));

export default MockSpendingRepository;
