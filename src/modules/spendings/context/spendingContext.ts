import { createContext } from 'react';
import SpendingRepository from '../domain/SpendingRepository';
import { SpendingFactory } from '../domain/Spending';
import RemoteSpendingRepository from '../remote/RemoteSpendingRepository';
import axiosInstance from 'remote/axiosInstance';
import { RemoteSpendingFactory } from '../remote/RemoteSpending';

export type SpendingContextType = {
    spendingRepository: SpendingRepository;
    spendingFactory: SpendingFactory;
};

const spendingContext = createContext<{
    spendingRepository: SpendingRepository;
    spendingFactory: SpendingFactory;
}>({
    spendingRepository: new RemoteSpendingRepository(axiosInstance),
    spendingFactory: new RemoteSpendingFactory(),
});

export default spendingContext;
